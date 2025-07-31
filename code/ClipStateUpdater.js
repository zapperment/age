const { numberOfPads, clipState } = require("./constants");
const PadMidiSender = require("./PadMidiSender");
const SimPadControlSender = require("./SimPadControlSender");
const RackToggler = require("./RackToggler");
const ClipTriggerCalculator = require("./ClipTriggerCalculator");

module.exports = class ClipStateUpdater {
  #state;
  #clipTriggerCalculator;
  #padMidiSender;
  #simPadControlSender;
  #rackToggler;

  constructor({ state, colours, ctqBeats }) {
    this.#state = state;
    this.#clipTriggerCalculator = new ClipTriggerCalculator({ ctqBeats });
    this.#padMidiSender = new PadMidiSender({ state, colours });
    this.#simPadControlSender = new SimPadControlSender({ state, colours });
    this.#rackToggler = new RackToggler({ state });
  }

  fire(outlet) {
    for (let padId = 1; padId <= numberOfPads; padId++) {
      const currentState = this.#state.get(`pads::${padId}::state`);
      if (currentState === clipState.EMPTY) {
        continue;
      }
      let nextState = currentState;
      switch (currentState) {
        case clipState.TRIGGERED:
          nextState = clipState.PLAYING;
          post(`Clip in pad ${padId} has started\n`);
          break;
        case clipState.STOPPING:
          nextState = clipState.STOPPED;
          post(`Clip in pad ${padId} has stopped\n`);
          break;
        default:
      }
      if (nextState !== currentState) {
        this.#state.replace(`pads::${padId}::state`, nextState);
        this.#padMidiSender.send(padId, outlet);
        this.#simPadControlSender.send(padId, outlet);
        this.#rackToggler.send(padId, outlet);
      }
    }
  }

  update(outlet) {
    if (this.#clipTriggerCalculator.isCycleStart) {
      this.fire(outlet);
    }
  }

  set ctq(ctq) {
    this.#clipTriggerCalculator.ctq = ctq;
  }

  set bar(bar) {
    this.#clipTriggerCalculator.bar = bar;
  }

  set beat(beat) {
    this.#clipTriggerCalculator.beat = beat;
  }

  set unit(unit) {
    this.#clipTriggerCalculator.unit = unit;
  }
};
