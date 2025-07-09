const PadMidiSender = require("./PadMidiSender");
const SimPadControlSender = require("./SimPadControlSender");
const { clipState } = require("./constants");

module.exports = class PadHitProcessor {
  #clips;
  #padMidiSender;
  #simPadControlSender;

  constructor({ clips, colours }) {
    this.#clips = clips;
    this.#padMidiSender = new PadMidiSender({ clips, colours });
    this.#simPadControlSender = new SimPadControlSender({ clips });
  }

  process(clipIndex, outlet) {
    const currentState = this.#clips.get(clipIndex).get("state");
    let nextState = currentState;
    switch (currentState) {
      // if the pad that was hit has no clip associated, do nothing
      case clipState.EMPTY:
        post(`Clip ${clipIndex + 1} is empty\n`);
        break;
      // if the clip associated to the pad that was hit…
      // was stopped, trigger it
      case clipState.STOPPED:
        nextState = clipState.TRIGGERED;
        post(`Clip ${clipIndex + 1} has been triggered\n`);
        break;
      // if the clip associated to the pad that was hit…
      // was triggered, leave it stopped, revoke the trigger
      case clipState.TRIGGERED:
        nextState = clipState.STOPPED;
        post(`Clip ${clipIndex + 1} is stopped (trigger revoked)\n`);
        break;
      // if the clip associated to the pad that was hit…
      // was playing, schedule it to stop
      case clipState.PLAYING:
        nextState = clipState.STOPPING;
        post(`Clip ${clipIndex + 1} is stopping\n`);
        break;
      // if the clip associated to the pad that was hit…
      // was scheduled to stop, let it continue to play, revoke the previous stop
      case clipState.STOPPING:
        nextState = clipState.PLAYING;
        post(`Clip ${clipIndex + 1} is playing (stop revoked)\n`);
        break;
      default:
    }
    if (nextState !== currentState) {
      this.#clips.replace(`${clipIndex}::state`, nextState);
      this.#padMidiSender.send(clipIndex, outlet);
      this.#simPadControlSender.send(clipIndex, outlet);
    }
  }
};
