const {
  clipState,
  padChannel,
  padCC,
  defaultMidiOutletIndex,
} = require("./constants");

const padIdToLaunchpadIndex = require("./padIdToLaunchpadIndex");

module.exports = class PadMidiSender {
  #state;
  #outletIndex;
  #colours;

  constructor({ state, colours, outletIndex }) {
    this.#outletIndex = outletIndex || defaultMidiOutletIndex;
    this.#state = state;
    this.#colours = colours;
  }

  send(padId, outlet) {
    const currentState = this.#state.get(`pads::${padId}::state`);
    const rackId = this.#state.get(`pads::${padId}::clip::rackId`);
    const colourId = this.#state.get(`racks::${rackId}::colourId`);
    const lpColourIndex = this.#colours.get(`${colourId}::lp`);
    const launchpadIndex = padIdToLaunchpadIndex(padId);
    post(`Pad MIDI sender state ${currentState}\n`);
    switch (currentState) {
      case clipState.TRIGGERED:
      case clipState.STOPPING:
        // have to send static black first to clear the pad
        // before making it flash
        outlet(this.#outletIndex, [
          padChannel.STATIC + padCC,
          launchpadIndex,
          this.#colours.get("black::lp"),
        ]);
        outlet(this.#outletIndex, [
          padChannel.FLASH + padCC,
          launchpadIndex,
          lpColourIndex,
        ]);
        break;
      case clipState.PLAYING:
        outlet(this.#outletIndex, [
          padChannel.PULSE + padCC,
          launchpadIndex,
          lpColourIndex,
        ]);
        break;
      case clipState.STOPPED:
        outlet(this.#outletIndex, [
          padChannel.STATIC + padCC,
          launchpadIndex,
          lpColourIndex,
        ]);
        break;
    }
  }
};
