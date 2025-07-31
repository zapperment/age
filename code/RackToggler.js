const { defaultRackTogglerOutletIndex, clipState } = require("./constants");

module.exports = class RackToggler {
  #state;
  #outletIndex;

  constructor({ state, outletIndex }) {
    this.#outletIndex = outletIndex || defaultRackTogglerOutletIndex;
    this.#state = state;
  }

  send(padId, outlet) {
    const state = this.#state.get(`pads::${padId}::state`);
    switch (state) {
      case clipState.STOPPING:
      case clipState.PLAYING:
        outlet(this.#outletIndex, [padId, 1]);
        break;
      case clipState.TRIGGERED:
      case clipState.STOPPED:
        outlet(this.#outletIndex, [padId, 0]);
        break;
      default:
    }
  }
};
