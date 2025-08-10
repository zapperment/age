import PerformanceModeUpdater from "./PerformanceModeUpdater";
import { beforeEach, describe, expect, it, test, vi } from "vitest";
import {
  numberOfPads,
  defaultMidiOutletIndex,
  defaultSimPadControlOutletIndex,
} from "./constants";

const state = new Map();
state.set("pads::1::state", "playing");
state.set("pads::1::clip::rackId", 1);
state.set("racks::1::colourId", "1");
for (let i = 2; i <= numberOfPads; i++) {
  state.set(`pads::${i}::state`, "empty");
}
const colours = new Map();
colours.set("1::lp", 7);
colours.set(
  "1::rgb",
  [0.5803921568627451, 0.11764705882352941, 0.13333333333333333]
);
colours.set("black::lp", 0);
colours.set("black::rgb", [0, 0, 0]);
const outlet = vi.fn();

beforeEach(() => {
  vi.clearAllMocks();
});

const performanceModeUpdater = new PerformanceModeUpdater({
  state,
  colours,
});
describe("The PerformanceModeUpdater", () => {
  describe("when its update method is called", () => {
    describe("the first message emitted", () => {
      it("should be sent to the default MIDI outlet", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[0][0]).toBe(defaultMidiOutletIndex);
      });
      it("should be a note onmessage to MIDI channel 1", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[0][1][0]).toBe(144);
      });
      it("should be a note on message for note number 81 (controls the upper left pad on the Launchpad)", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[0][1][1]).toBe(81);
      });
      it("should be a note on message with velocity 7 (the launchpad colour index for colour “Burgundy”)", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[0][1][2]).toBe(7);
      });
    });
    describe("the second message emitted", () => {
      it("should be sent to the default Sim Pad Control outlet", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[1][0]).toBe(defaultSimPadControlOutletIndex);
      });
      it("should be a Sim Pad Control message for pad 1 (the upper left pad on the screen)", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[1][1][0]).toBe(1);
      });
      it("should be a Sim Pad Control message for setting the pad's colour", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[1][1][1]).toBe("colour");
      });
      it("should be a SPC colour message with the RGB values for colour “Burgundy”", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[1][1][2]).toBe(0.5803921568627451);
        expect(outlet.mock.calls[1][1][3]).toBe(0.11764705882352941);
        expect(outlet.mock.calls[1][1][4]).toBe(0.13333333333333333);
      });
    });
    describe("the third message emitted", () => {
      it("should be sent to the default MIDI outlet", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[2][0]).toBe(defaultMidiOutletIndex);
      });
      it("should be a note on message to MIDI channel 1", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[2][1][0]).toBe(144);
      });
      it("should be a note on message for note number 82 (controls the second pad from the left in the top row on the Launchpad)", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[2][1][1]).toBe(82);
      });
      it("should be a note on message with velocity 0 (the launchpad colour index for colour “Black”)", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[2][1][2]).toBe(0);
      });
    });
    describe("the fourth message emitted", () => {
      it("should be sent to the default Sim Pad Control outlet", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[3][0]).toBe(defaultSimPadControlOutletIndex);
      });
      it("should be a Sim Pad Control message for pad 2 (the second pad from the left in the top row on the screen)", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[3][1][0]).toBe(2);
      });
      it("should be a SPC empty message", () => {
        performanceModeUpdater.update(outlet);
        expect(outlet.mock.calls[3][1][1]).toBe("empty");
      });
    });
  });
});
