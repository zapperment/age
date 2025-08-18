const {
  numberOfPads,
  defaultMidiOutletIndex,
  defaultSimPadControlOutletIndex,
} = require("./constants");
const SimPadControlSender = require("./SimPadControlSender");
const PadMidiSender = require("./PadMidiSender");

module.exports = class PerformanceModeUpdater {
  #numberOfPads;
  #simPadControlSender;
  #padMidiSender;

  constructor({
    state,
    colours,
    numberOfPads: customNumberOfPads,
    midiOutletIndex: customMidiOutletIndex,
    simPadControlOutletIndex: customSimPadControlOutletIndex,
  }) {
    const midiOutletIndex =
      customMidiOutletIndex === undefined
        ? defaultMidiOutletIndex
        : customMidiOutletIndex;
    const simPadControlOutletIndex =
      customSimPadControlOutletIndex === undefined
        ? defaultSimPadControlOutletIndex
        : customSimPadControlOutletIndex;
    this.#numberOfPads =
      customNumberOfPads === undefined ? numberOfPads : customNumberOfPads;
    this.#simPadControlSender = new SimPadControlSender({
      state,
      colours,
      outletIndex: simPadControlOutletIndex,
    });
    this.#padMidiSender = new PadMidiSender({
      state,
      colours,
      outletIndex: midiOutletIndex,
    });
  }

  update(padId, outlet) {
    this.#padMidiSender.send(padId, outlet);
    this.#simPadControlSender.send(padId, outlet);
  }

  updateAll(outlet) {
    for (let padId = 1; padId <= this.#numberOfPads; padId++) {
      this.update(padId, outlet);
    }
  }
};
