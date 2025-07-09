const {
  clipState,
  padChannel,
  padCC,
  defaultMidiOutletIndex,
} = require("./constants");

const clipIndexToPadIndex = require("./clipIndexToPadIndex");

module.exports = class PadMidiSender {
  #clips;
  #outletIndex;
  #colours;

  constructor({ clips, colours, outletIndex }) {
    this.#outletIndex = outletIndex || defaultMidiOutletIndex;
    this.#clips = clips;
    this.#colours = colours;
  }

  send(clipIndex, outlet) {
    const currentState = this.#clips.get(clipIndex).get("state");
    const colourIndex = this.#clips.get(clipIndex).get("colour").get("lp");
    const padIndex = clipIndexToPadIndex(clipIndex);
    switch (currentState) {
      case clipState.TRIGGERED:
      case clipState.STOPPING:
        // have to send static black first to clear the pad
        // before making it flash
        outlet(this.#outletIndex, [
          padChannel.STATIC + padCC,
          padIndex,
          this.#colours.get("black").get("lp"),
        ]);
        outlet(this.#outletIndex, [
          padChannel.FLASH + padCC,
          padIndex,
          colourIndex,
        ]);
        break;
      case clipState.PLAYING:
        outlet(this.#outletIndex, [
          padChannel.PULSE + padCC,
          padIndex,
          colourIndex,
        ]);
        break;
      case clipState.STOPPED:
        outlet(this.#outletIndex, [
          padChannel.STATIC + padCC,
          padIndex,
          colourIndex,
        ]);
        break;
    }
  }
};
