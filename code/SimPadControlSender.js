const { defaultSimPadControlOutletIndex } = require("./constants");

module.exports = class SimPadControlSender {
  #clips;
  #outletIndex;

  constructor({ clips, outletIndex }) {
    this.#outletIndex = outletIndex || defaultSimPadControlOutletIndex;
    this.#clips = clips;
  }

  send(clipIndex, outlet) {
    const clip = this.#clips.get(clipIndex);
    const state = clip.get("state");
    const rgb = clip.get("colour").get("rgb");
    outlet(this.#outletIndex, [clipIndex, "colour", ...rgb]);
    outlet(this.#outletIndex, [clipIndex, state]);
  }
};
