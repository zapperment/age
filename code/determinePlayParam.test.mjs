import { expect, test, beforeAll, afterAll, vi } from "vitest";
import { paramType } from "./constants";
import determinePlayParam from "./determinePlayParam";

const combinatorWithPlaySwitch = {
  name: "Combinator",
  params: [
    { id: 1, name: "Singen", type: paramType.control },
    { id: 2, name: "Tanzen", type: paramType.control },
    { id: 3, name: "Seq. On/Off", type: paramType.play },
    { id: 4, name: "Lachen", type: paramType.switch },
    { id: 5, name: "Enabled", type: paramType.enabled },
    { id: 6, name: "Mixer Level", type: paramType.unipolar },
  ],
};

const basslineGenerator = {
  name: "Bassline Generator",
  params: [
    { id: 7, name: "On", type: paramType.play },
    { id: 8, name: "P1 Minorness", type: paramType.unipolar },
    { id: 9, name: "P1 Note Range", type: paramType.unipolar },
    { id: 10, name: "P1 OffBeat Bank", type: paramType.boolean },
  ],
};

const combinatorWithNoPlaySwitch = {
  name: "Combinator",
  params: [
    { id: 11, name: "Bier", type: paramType.control },
    { id: 12, name: "Schnaps", type: paramType.control },
    { id: 13, name: "Wein", type: paramType.switch },
    { id: 14, name: "Limo", type: paramType.switch },
    { id: 15, name: "Enabled", type: paramType.enabled },
    { id: 16, name: "Mixer Level", type: paramType.unipolar },
  ],
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
    expect(determinePlayParam(devices)).toBe(3);
  }
);

test(
  "When given a map of devices that contains a Combinator with no play switch, " +
    "null should be returned",
  () => {
    const devices = new Map();
    devices.set(1, combinatorWithNoPlaySwitch);
    expect(determinePlayParam(devices)).toBeNull();
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
    expect(determinePlayParam(devices)).toBe(7);
  }
);

test(
  "When given a map of devices that contains a Bassline Generator and a Combinator with a play switch, " +
    "the play param ID returned should be that of the Combinator's play switch (Combinator has priority)",
  () => {
    const devices = new Map();
    devices.set(1, basslineGenerator);
    devices.set(2, combinatorWithPlaySwitch);
    expect(determinePlayParam(devices)).toBe(3);
  }
);

test(
  "When given a map of devices that contains a Basseline Generator and a Combinator with no play switch, " +
    "the play param ID returned should be that of the Bassline Generator's play switch",
  () => {
    const devices = new Map();
    devices.set(1, basslineGenerator);
    devices.set(2, combinatorWithNoPlaySwitch);
    expect(determinePlayParam(devices)).toBe(7);
  }
);

afterAll(() => {
  global.post = undefined;
});
