import { expect, test, beforeAll, afterAll, vi } from "vitest";
import { paramType } from "./constants";
import determinePlayParam from "./determinePlayParam";

const params = new Map();
params.set(1, { id: 1, name: "Singen", type: paramType.control });
params.set(2, { id: 2, name: "Tanzen", type: paramType.control });
params.set(3, { id: 3, name: "Seq. On/Off", type: paramType.play });
params.set(4, { id: 4, name: "Lachen", type: paramType.switch });
params.set(5, { id: 5, name: "Enabled", type: paramType.enabled });
params.set(6, { id: 6, name: "Mixer Level", type: paramType.unipolar });
params.set(7, { id: 7, name: "On", type: paramType.play });
params.set(8, { id: 8, name: "P1 Minorness", type: paramType.unipolar });
params.set(9, { id: 9, name: "P1 Note Range", type: paramType.unipolar });
params.set(10, { id: 10, name: "P1 OffBeat Bank", type: paramType.boolean });
params.set(11, { id: 11, name: "Bier", type: paramType.control });
params.set(12, { id: 12, name: "Schnaps", type: paramType.control });
params.set(13, { id: 13, name: "Wein", type: paramType.switch });
params.set(14, { id: 14, name: "Limo", type: paramType.switch });
params.set(15, { id: 15, name: "Enabled", type: paramType.enabled });
params.set(16, { id: 16, name: "Mixer Level", type: paramType.unipolar });

const combinatorWithPlaySwitch = {
  name: "Combinator",
  params: [1, 2, 3, 4, 5, 6],
};

const basslineGenerator = {
  name: "Bassline Generator",
  params: [7, 8, 9, 10],
};

const combinatorWithNoPlaySwitch = {
  name: "Combinator",
  params: [11, 12, 13, 14, 15, 16],
};

beforeAll(() => {
  global.post = vi.fn();
});

test(
  "When given a map of devices that contains a Combinator with a play switch, " +
    "the play param ID returned should be that of the Combinator's play switch",
  () => {
    const devices = new Map();
    devices.set(1, combinatorWithPlaySwitch);
    expect(determinePlayParam(devices, params)).toBe(3);
  }
);

test(
  "When given a map of devices that contains a Combinator with no play switch, " +
    "null should be returned",
  () => {
    const devices = new Map();
    devices.set(1, combinatorWithNoPlaySwitch);
    expect(determinePlayParam(devices, params)).toBeNull();
  }
);

test(
  "When given a map of devices that contains a Combinator with no play switch, " +
    "a warning message should be printed to the Max console",
  () => {
    const devices = new Map();
    devices.set(1, combinatorWithNoPlaySwitch);
    expect(global.post).toHaveBeenCalledWith(
      "No play param found in any device\n"
    );
  }
);

test(
  "When given a map of devices that contains a Bassline Generator, " +
    "the play param ID returned should be that of the Bassline Generator's play switch",
  () => {
    const devices = new Map();
    devices.set(1, basslineGenerator);
    expect(determinePlayParam(devices, params)).toBe(7);
  }
);

test(
  "When given a map of devices that contains a Bassline Generator and a Combinator with a play switch, " +
    "the play param ID returned should be that of the Combinator's play switch (Combinator has priority)",
  () => {
    const devices = new Map();
    devices.set(1, basslineGenerator);
    devices.set(2, combinatorWithPlaySwitch);
    expect(determinePlayParam(devices, params)).toBe(3);
  }
);

test(
  "When given a map of devices that contains a Basseline Generator and a Combinator with no play switch, " +
    "the play param ID returned should be that of the Bassline Generator's play switch",
  () => {
    const devices = new Map();
    devices.set(1, basslineGenerator);
    devices.set(2, combinatorWithNoPlaySwitch);
    expect(determinePlayParam(devices, params)).toBe(7);
  }
);

afterAll(() => {
  global.post = undefined;
});
