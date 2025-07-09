const assert = require("node:assert");

const ClipTriggerCalculator = require("./ClipTriggerCalculator");

// we are faking clip trigger quantisation mode 2, which is 4 bars, i.e. 16 beats per loop
const clipTriggerCalculator = new ClipTriggerCalculator({
  ctqBeats: {
    get: () => 16,
  },
});

clipTriggerCalculator.ctq = 2;
clipTriggerCalculator.bar = 1;
clipTriggerCalculator.beat = 1;

assert(
  clipTriggerCalculator.currentLamp === 1,
  `When the bar and beat are 1, the current lamp should be 1!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 2;

assert(
  clipTriggerCalculator.currentLamp === 1,
  `When the bar is 1 and beat is 2, the current lamp should be 1!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 3;

assert(
  clipTriggerCalculator.currentLamp === 2,
  `When the bar is 1 and beat is 3, the current lamp should be 2!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 4;

assert(
  clipTriggerCalculator.currentLamp === 2,
  `When the bar is 1 and beat is 4, the current lamp should be 2!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.bar = 2;
clipTriggerCalculator.beat = 1;

assert(
  clipTriggerCalculator.currentLamp === 3,
  `When the bar is 2 and beat is 1, the current lamp should be 3!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 2;

assert(
  clipTriggerCalculator.currentLamp === 3,
  `When the bar is 2 and beat is 2, the current lamp should be 3!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.beat = 3;

assert(
  clipTriggerCalculator.currentLamp === 4,
  `When the bar is 2 and beat is 3, the current lamp should be 4!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.bar = 4;
clipTriggerCalculator.beat = 4;

assert(
  clipTriggerCalculator.currentLamp === 8,
  `When the bar is 4 and beat is 4, the current lamp should be 8!\n${clipTriggerCalculator.toString()}`
);

clipTriggerCalculator.bar = 5;
clipTriggerCalculator.beat = 1;

assert(
  clipTriggerCalculator.currentLamp === 1,
  `When the bar is 5 and beat is 1, the current lamp should be 1!\n${clipTriggerCalculator.toString()}`
);
