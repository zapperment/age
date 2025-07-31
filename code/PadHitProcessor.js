const PadMidiSender = require("./PadMidiSender");
const SimPadControlSender = require("./SimPadControlSender");
const { clipState } = require("./constants");

module.exports = class PadHitProcessor {
  #state;
  #padMidiSender;
  #simPadControlSender;

  constructor({ state, colours }) {
    this.#state = state;
    this.#padMidiSender = new PadMidiSender({ state, colours });
    this.#simPadControlSender = new SimPadControlSender({ state, colours });
  }

  process(padId, outlet) {
    const currentState = this.#state.get(`pads::${padId}::state`);
    let nextState = currentState;
    switch (currentState) {
      // if the pad that was hit has no clip associated, do nothing
      case clipState.EMPTY:
        post(`Clip ${padId} is empty\n`);
        break;
      // if the clip associated to the pad that was hit…
      // was stopped, trigger it
      case clipState.STOPPED:
        nextState = clipState.TRIGGERED;
        post(`Clip ${padId} has been triggered\n`);
        break;
      // if the clip associated to the pad that was hit…
      // was triggered, leave it stopped, revoke the trigger
      case clipState.TRIGGERED:
        nextState = clipState.STOPPED;
        post(`Clip ${padId} is stopped (trigger revoked)\n`);
        break;
      // if the clip associated to the pad that was hit…
      // was playing, schedule it to stop
      case clipState.PLAYING:
        nextState = clipState.STOPPING;
        post(`Clip ${padId} is stopping\n`);
        break;
      // if the clip associated to the pad that was hit…
      // was scheduled to stop, let it continue to play, revoke the previous stop
      case clipState.STOPPING:
        nextState = clipState.PLAYING;
        post(`Clip ${padId} is playing (stop revoked)\n`);
        break;
      default:
    }
    if (nextState !== currentState) {
      this.#state.replace(`pads::${padId}::state`, nextState);
      this.#padMidiSender.send(padId, outlet);
      this.#simPadControlSender.send(padId, outlet);
    }
  }
};
