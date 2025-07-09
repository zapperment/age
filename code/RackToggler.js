const { defaultRackTogglerOutletIndex, clipState } = require("./constants");

module.exports = class RackToggler {
  #clips;
  #outletIndex;

  constructor({ clips, outletIndex }) {
    this.#outletIndex = outletIndex || defaultRackTogglerOutletIndex;
    this.#clips = clips;
  }

  send(clipIndex, outlet) {
    const clip = this.#clips.get(clipIndex);
    const state = clip.get("state");
    switch (state) {
      case clipState.STOPPING:
      case clipState.PLAYING:
        outlet(this.#outletIndex, [clipIndex, 1]);
        break;
      case clipState.TRIGGERED:
      case clipState.STOPPED:
        outlet(this.#outletIndex, [clipIndex, 0]);
        break;
      default:
    }
  }
};
