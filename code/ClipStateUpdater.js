const { numberOfClips, clipState } = require("./constants");
const PadMidiSender = require("./PadMidiSender");
const SimPadControlSender = require("./SimPadControlSender");
const RackToggler = require("./RackToggler");
const ClipTriggerCalculator = require("./ClipTriggerCalculator");

module.exports = class ClipStateUpdater {
  #clips;
  #clipTriggerCalculator;
  #padMidiSender;
  #simPadControlSender;
  #rackToggler;

  constructor({ clips, colours, ctqBeats }) {
    this.#clips = clips;
    this.#clipTriggerCalculator = new ClipTriggerCalculator({ ctqBeats });
    this.#padMidiSender = new PadMidiSender({ clips, colours });
    this.#simPadControlSender = new SimPadControlSender({ clips });
    this.#rackToggler = new RackToggler({ clips });
  }

  fire(outlet) {
    for (let clipIndex = 0; clipIndex < numberOfClips; clipIndex++) {
      const currentState = this.#clips.get(clipIndex).get("state");
      let nextState = currentState;
      switch (currentState) {
        case clipState.TRIGGERED:
          nextState = clipState.PLAYING;
          post(`Clip ${clipIndex + 1} has started\n`);
          break;
        case clipState.STOPPING:
          nextState = clipState.STOPPED;
          post(`Clip ${clipIndex + 1} has stopped\n`);
          break;
        default:
      }
      if (nextState !== currentState) {
        this.#clips.replace(`${clipIndex}::state`, nextState);
        this.#padMidiSender.send(clipIndex, outlet);
        this.#simPadControlSender.send(clipIndex, outlet);
        this.#rackToggler.send(clipIndex, outlet);
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
