import { expect, test } from "vitest";

import ClipTriggerCalculator from "./ClipTriggerCalculator";

test.for([
  [2, 16, 1, 1, 1],
  [2, 16, 1, 2, 1],
  [2, 16, 1, 3, 2],
  [2, 16, 1, 4, 2],
  [2, 16, 2, 1, 3],
  [2, 16, 2, 2, 3],
  [2, 16, 2, 3, 4],
  [2, 16, 2, 4, 4],
  [2, 16, 3, 1, 5],
  [2, 16, 3, 2, 5],
  [2, 16, 3, 3, 6],
  [2, 16, 3, 4, 6],
  [2, 16, 4, 1, 7],
  [2, 16, 4, 2, 7],
  [2, 16, 4, 3, 8],
  [2, 16, 4, 4, 8],
  [2, 16, 5, 1, 1],
  [3, 8, 1, 1, 1],
  [3, 8, 1, 2, 2],
  [3, 8, 1, 3, 3],
  [3, 8, 1, 4, 4],
  [3, 8, 2, 1, 5],
  [3, 8, 2, 2, 6],
  [3, 8, 2, 3, 7],
  [3, 8, 2, 4, 8],
  [3, 8, 3, 1, 1],
  [3, 8, 3, 2, 2],
  [3, 8, 3, 3, 3],
  [3, 8, 3, 4, 4],
  [3, 8, 4, 1, 5],
  [3, 8, 4, 2, 6],
  [3, 8, 4, 3, 7],
  [3, 8, 4, 4, 8],
  [3, 8, 5, 1, 1],
])(
  "With quantisation set to mode %i (%i beats), when the bar is %i and the beat is %i, the current lamp should be %i",
  ([ctq, ctqBeats, bar, beat, expected]) => {
    const clipTriggerCalculator = new ClipTriggerCalculator({
      ctqBeats: {
        get: () => ctqBeats,
      },
    });
    clipTriggerCalculator.ctq = ctq;
    clipTriggerCalculator.bar = bar;
    clipTriggerCalculator.beat = beat;
    expect(clipTriggerCalculator.currentLamp).toBe(expected);
  }
);
