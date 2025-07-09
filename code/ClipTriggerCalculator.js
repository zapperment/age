const {
  beatsPerBar,
  numberOfBeatLamps,
  ppq,
  metroInterval,
} = require("./constants");

module.exports = class BeatLamps {
  #bar = null;
  #beat = null;
  #unit = null;
  #ctq = null;
  #ctqBeats = null;

  constructor({ ctqBeats }) {
    if (!ctqBeats) {
      throw new Error(
        "ctqBeats is required to instantiate a ClipTriggerCalculator"
      );
    }
    this.#ctqBeats = ctqBeats;
  }

  set ctq(ctq) {
    this.#ctq = ctq;
  }

  set bar(bar) {
    this.#bar = bar;
  }

  set beat(beat) {
    this.#beat = beat;
  }

  set unit(unit) {
    this.#unit = unit;
  }

  #getBeatsPerLoop() {
    return this.#ctqBeats.get(this.#ctq);
  }

  #getElapsedBeats() {
    if (this.#bar === null || this.#beat === null) {
      return 0;
    }
    return (this.#bar - 1) * beatsPerBar + this.#beat - 1;
  }

  #getElapsedLoops() {
    const beatsPerLoop = this.#getBeatsPerLoop();
    const elapsedBeats = this.#getElapsedBeats();
    return Math.floor(elapsedBeats / beatsPerLoop);
  }

  #getElapsedLoopBeats() {
    const beatsPerLoop = this.#getBeatsPerLoop();
    const elapsedLoops = this.#getElapsedLoops();
    return elapsedLoops * beatsPerLoop;
  }

  #getCurrentLoopBeats() {
    const elapsedBeats = this.#getElapsedBeats();
    const elapsedLoopBeats = this.#getElapsedLoopBeats();
    return elapsedBeats - elapsedLoopBeats;
  }

  #getBeatsPerLamp() {
    const beatsPerLoop = this.#getBeatsPerLoop();
    return beatsPerLoop / numberOfBeatLamps;
  }

  get currentLamp() {
    const currentLoopBeats = this.#getCurrentLoopBeats();
    const beatsPerLamp = this.#getBeatsPerLamp();
    return Math.floor(currentLoopBeats / beatsPerLamp) + 1;
  }

  #isLastBeat() {
    const beatsPerLoop = this.#getBeatsPerLoop();
    const currentLoopBeats = this.#getCurrentLoopBeats();
    return currentLoopBeats === beatsPerLoop - 1;
  }

  get isCycleStart() {
    if (this.#unit === null) {
      // if unit is not set, the calculation is based on the bar and beat
      return this.#getCurrentLoopBeats() === 0;
    }
    // we want to trigger clips a tiny amount of time early, otherwise the
    // reason players won't place the first note
    if (!this.#isLastBeat()) {
      return false;
    }
    return this.#unit >= ppq - metroInterval;
  }

  toString() {
    return `
Current bar:          ${this.#bar}
current beat:         ${this.#beat}
Beats per loop:       ${this.#getBeatsPerLoop()}
Elapsed beats:        ${this.#getElapsedBeats()}
Elapsed loops:        ${this.#getElapsedLoops()}
Elapsed loop beats:   ${this.#getElapsedLoopBeats()}
Current loop beats:   ${this.#getCurrentLoopBeats()}
Beats per lamp:       ${this.#getBeatsPerLamp()}
Current lamp:         ${this.currentLamp}
Is last beat?         ${this.#isLastBeat()}
Is cycle start?       ${this.isCycleStart}`.trim();
  }
};
