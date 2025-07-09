const { beatLampColours } = require("./constants");
const ClipTriggerCalculator = require("./ClipTriggerCalculator");

module.exports = class BeatLamps {
  #clipTriggerCalculator;

  constructor({ ctqBeats }) {
    this.#clipTriggerCalculator = new ClipTriggerCalculator({ ctqBeats });
  }

  // Note: we have to pass the outlet function;
  // if we store it in the class, it will make Max crash
  update(outlet) {
    const currentLamp = this.#clipTriggerCalculator.currentLamp;
    for (let i = 0; i < 8; i++) {
      const isOn = i < currentLamp;
      outlet(i, isOn ? 1 : 0);
      const colourIndex = isOn ? beatLampColours[i] : 0;
      const lampPosition = i * 10 + 19;
      outlet(8, [144, lampPosition, colourIndex]);
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
};
