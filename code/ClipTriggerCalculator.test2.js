const assert = require("node:assert");

const ClipTriggerCalculator = require("./ClipTriggerCalculator");

// we are faking clip trigger quantisation mode 3, which is 2 bars, i.e. 8 beats per loop
const clipTriggerCalculator = new ClipTriggerCalculator({
  ctqBeats: {
    get: () => 8,
  },
});

clipTriggerCalculator.ctq = 3;
clipTriggerCalculator.bar = 1;
clipTriggerCalculator.beat = 1;

assert(
  clipTriggerCalculator.currentLamp === 1,
  `When the bar and beat are 1, the current lamp should be 1!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 2;

assert(
  clipTriggerCalculator.currentLamp === 2,
  `When the bar is 1 and beat is 2, the current lamp should be 2!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 3;

assert(
  clipTriggerCalculator.currentLamp === 3,
  `When the bar is 1 and beat is 3, the current lamp should be 3!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 4;

assert(
  clipTriggerCalculator.currentLamp === 4,
  `When the bar is 1 and beat is 4, the current lamp should be 4!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.bar = 2;
clipTriggerCalculator.beat = 1;

assert(
  clipTriggerCalculator.currentLamp === 5,
  `When the bar is 2 and beat is 1, the current lamp should be 5!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 2;

assert(
  clipTriggerCalculator.currentLamp === 6,
  `When the bar is 2 and beat is 2, the current lamp should be 6!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 3;

assert(
  clipTriggerCalculator.currentLamp === 7,
  `When the bar is 2 and beat is 3, the current lamp should be 7!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 4;

assert(
  clipTriggerCalculator.currentLamp === 8,
  `When the bar is 2 and beat is 4, the current lamp should be 8!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.bar = 3;
clipTriggerCalculator.beat = 1;

assert(
  clipTriggerCalculator.currentLamp === 1,
  `When the bar is 3 and beat is 1, the current lamp should be 1!\n${clipTriggerCalculator.toString()}`
);
