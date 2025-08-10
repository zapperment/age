const {
  clipState,
  numberOfPads,
  defaultMidiOutletIndex,
  defaultSimPadControlOutletIndex,
} = require("./constants");
const padIdToLaunchpadIndex = require("./padIdToLaunchpadIndex");

module.exports = class PerformanceModeUpdater {
  #state;
  #colours;

  constructor({ state, colours }) {
    this.#state = state;
    this.#colours = colours;
  }

  update(outlet) {
    for (let padId = 1; padId <= numberOfPads; padId++) {
      const padState = this.#state.get(`pads::${padId}::state`);
      const launchpadIndex = padIdToLaunchpadIndex(padId);
      if (padState === clipState.EMPTY) {
        outlet(defaultMidiOutletIndex, [
          144,
          launchpadIndex,
          this.#colours.get(`black::lp`),
        ]);
        outlet(defaultSimPadControlOutletIndex, [padId, "empty"]);
        continue;
      }
      const rackId = this.#state.get(`pads::${padId}::clip::rackId`);
      const colourId = this.#state.get(`racks::${rackId}::colourId`);
      const launchpadColourIndex = this.#colours.get(`${colourId}::lp`);
      const colourRgb = this.#colours.get(`${colourId}::rgb`);
      outlet(defaultMidiOutletIndex, [
        144,
        launchpadIndex,
        launchpadColourIndex,
      ]);
      outlet(defaultSimPadControlOutletIndex, [padId, "colour", ...colourRgb]);
    }
  }
};
