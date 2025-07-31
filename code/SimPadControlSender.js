const { defaultSimPadControlOutletIndex } = require("./constants");

module.exports = class SimPadControlSender {
  #state;
  #colours;
  #outletIndex;

  constructor({ state, colours, outletIndex }) {
    this.#outletIndex = outletIndex || defaultSimPadControlOutletIndex;
    this.#state = state;
    this.#colours = colours;
  }

  send(padId, outlet) {
    const state = this.#state.get(`pads::${padId}::state`);
    const rackId = this.#state.get(`pads::${padId}::clip::rackId`);
    const colourId = this.#state.get(`racks::${rackId}::colourId`);
    const rgb = this.#colours.get(`${colourId}::rgb`);
    outlet(this.#outletIndex, [padId, "colour", ...rgb]);
    outlet(this.#outletIndex, [padId, state]);
  }
};
