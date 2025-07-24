const assert = require("node:assert");

const determineRackDevice = require("./determineRackDevice");

assert(
  JSON.stringify(
    determineRackDevice("My nice Combi", [
      { name: "Singen", value: 0.23, id: 1 },
      { name: "Tanzen", value: 0.88, id: 2 },
      { name: "Lachen", value: 0.1, id: 3 },
      { name: "Unused Control 4", value: 0, id: 4 },
      { name: "Unused Control 5", value: 0, id: 5 },
      { name: "Unused Control 6", value: 0, id: 6 },
      { name: "Unused Control 7", value: 0, id: 7 },
      { name: "Unused Control 8", value: 0, id: 8 },
      { name: "Unused Control 9", value: 0, id: 9 },
      { name: "Unused Control 10", value: 0, id: 10 },
      { name: "Unused Control 11", value: 0, id: 11 },
      { name: "Unused Control 12", value: 0, id: 12 },
      { name: "Unused Control 13", value: 0, id: 13 },
      { name: "Unused Control 14", value: 0, id: 14 },
      { name: "Unused Control 15", value: 0, id: 15 },
      { name: "Unused Control 16", value: 0, id: 16 },
      { name: "Unused Control 17", value: 0, id: 17 },
      { name: "Unused Control 18", value: 0, id: 18 },
      { name: "Unused Control 19", value: 0, id: 19 },
      { name: "Unused Control 20", value: 0, id: 20 },
      { name: "Unused Control 21", value: 0, id: 21 },
      { name: "Unused Control 22", value: 0, id: 22 },
      { name: "Unused Control 23", value: 0, id: 23 },
      { name: "Unused Control 24", value: 0, id: 24 },
      { name: "Unused Control 25", value: 0, id: 25 },
      { name: "Unused Control 26", value: 0, id: 26 },
      { name: "Unused Control 27", value: 0, id: 27 },
      { name: "Unused Control 28", value: 0, id: 28 },
      { name: "Unused Control 29", value: 0, id: 29 },
      { name: "Unused Control 30", value: 0, id: 30 },
      { name: "Unused Control 31", value: 0, id: 31 },
      { name: "Unused Control 32", value: 0, id: 32 },
      { name: "Hello", value: 0.11, id: 33 },
      { name: "Goodbye", value: 0.12, id: 34 },
      { name: "Unused Switch 3", value: 0, id: 35 },
      { name: "Unused Switch 4", value: 0, id: 36 },
      { name: "Unused Switch 5", value: 0, id: 37 },
      { name: "Unused Switch 6", value: 0, id: 38 },
      { name: "Unused Switch 7", value: 0, id: 39 },
      { name: "Unused Switch 8", value: 0, id: 40 },
      { name: "Unused Switch 9", value: 0, id: 41 },
      { name: "Unused Switch 10", value: 0, id: 42 },
      { name: "Unused Switch 11", value: 0, id: 43 },
      { name: "Unused Switch 12", value: 0, id: 44 },
      { name: "Unused Switch 13", value: 0, id: 45 },
      { name: "Unused Switch 14", value: 0, id: 46 },
      { name: "Unused Switch 15", value: 0, id: 47 },
      { name: "Unused Switch 16", value: 0, id: 48 },
      { name: "Unused Switch 17", value: 0, id: 49 },
      { name: "Unused Switch 18", value: 0, id: 50 },
      { name: "Unused Switch 19", value: 0, id: 51 },
      { name: "Unused Switch 20", value: 0, id: 52 },
      { name: "Unused Switch 21", value: 0, id: 53 },
      { name: "Unused Switch 22", value: 0, id: 54 },
      { name: "Unused Switch 23", value: 0, id: 55 },
      { name: "Unused Switch 24", value: 0, id: 56 },
      { name: "Unused Switch 25", value: 0, id: 57 },
      { name: "Unused Switch 26", value: 0, id: 58 },
      { name: "Unused Switch 27", value: 0, id: 59 },
      { name: "Unused Switch 28", value: 0, id: 60 },
      { name: "Unused Switch 29", value: 0, id: 61 },
      { name: "Unused Switch 30", value: 0, id: 62 },
      { name: "Unused Switch 31", value: 0, id: 63 },
      { name: "Unused Switch 32", value: 0, id: 64 },
      { name: "Enabled", value: 1, id: 65 },
      { name: "Mixer Level", value: 0.5, id: 66 },
    ]),
    null,
    2
  ) ===
    `
{
  "id": "combinator",
  "name": "Combinator",
  "vendor": "Reason Studios",
  "type": "Utility",
  "params": [
    {
      "name": "Singen",
      "type": "control",
      "value": 0.23,
      "id": 1
    },
    {
      "name": "Tanzen",
      "type": "control",
      "value": 0.88,
      "id": 2
    },
    {
      "name": "Lachen",
      "type": "control",
      "value": 0.1,
      "id": 3
    },
    {
      "name": "Hello",
      "type": "switch",
      "value": 0.11,
      "id": 33
    },
    {
      "name": "Goodbye",
      "type": "switch",
      "value": 0.12,
      "id": 34
    },
    {
      "name": "Enabled",
      "type": "enabled",
      "value": 1,
      "id": 65
    },
    {
      "name": "Mixer Level",
      "type": "unipolar",
      "value": 0.5,
      "id": 66
    }
  ],
  "patch": "My nice Combi"
}
`.trim(),
  "Given Combinator device parameters, the device returned should be correct"
);

assert(
  JSON.stringify(
    determineRackDevice("My happy little scales and chords", [
      { name: "Add Color", value: 0.1, id: 1 },
      { name: "Add Octave Down", value: 0.2, id: 2 },
      { name: "Add Octave Up", value: 0.3, id: 3 },
      { name: "Alter", value: 0.4, id: 4 },
      { name: "Chords", value: 0.5, id: 5 },
      { name: "Custom Scale", value: 0.6, id: 6 },
      { name: "Filter Notes", value: 0.7, id: 7 },
      { name: "Inversion", value: 0.8, id: 8 },
      { name: "Key", value: 0.9, id: 9 },
      { name: "Nr of Notes", value: 1, id: 10 },
      { name: "On", value: 1, id: 11 },
      { name: "Open Chords", value: 0.1, id: 12 },
      { name: "Scale", value: 0.1, id: 13 },
    ]),
    null,
    2
  ) ===
    `
{
  "id": "scalesAndChords",
  "name": "Scales & Chords",
  "vendor": "Reason Studios",
  "type": "Player",
  "params": [
    {
      "name": "Add Color",
      "type": "boolean",
      "value": 0.1,
      "id": 1
    },
    {
      "name": "Add Octave Down",
      "type": "boolean",
      "value": 0.2,
      "id": 2
    },
    {
      "name": "Add Octave Up",
      "type": "boolean",
      "value": 0.3,
      "id": 3
    },
    {
      "name": "Alter",
      "type": "boolean",
      "value": 0.4,
      "id": 4
    },
    {
      "name": "Chords",
      "type": "boolean",
      "value": 0.5,
      "id": 5
    },
    {
      "name": "Custom Scale",
      "type": "unipolar",
      "value": 0.6,
      "id": 6
    },
    {
      "name": "Filter Notes",
      "type": "boolean",
      "value": 0.7,
      "id": 7
    },
    {
      "name": "Inversion",
      "type": "unipolar",
      "value": 0.8,
      "id": 8
    },
    {
      "name": "Key",
      "type": "unipolar",
      "value": 0.9,
      "id": 9
    },
    {
      "name": "Nr of Notes",
      "type": "unipolar",
      "value": 1,
      "id": 10
    },
    {
      "name": "On",
      "type": "play",
      "value": 1,
      "id": 11
    },
    {
      "name": "Open Chords",
      "type": "boolean",
      "value": 0.1,
      "id": 12
    },
    {
      "name": "Scale",
      "type": "unipolar",
      "value": 0.1,
      "id": 13
    }
  ],
  "patch": "My happy little scales and chords"
}
`.trim(),
  "Given parameters from the Scales & Chords device, the device returned should be correct"
);

assert(
  JSON.stringify(
    determineRackDevice("Some stupid patch", [
      { name: "Blabla", value: 0.1, id: 1 },
      { name: "Blubb", value: 0.2, id: 2 },
      { name: "Rappatoff", value: 0.3, id: 3 },
    ]),
    null,
    2
  ) ===
    `
{
  "id": "unknown",
  "name": "Unknown Device",
  "vendor": "Unknown",
  "type": "Unknown",
  "params": [
    {
      "name": "Blabla",
      "type": "unipolar",
      "value": 0.1,
      "id": 1
    },
    {
      "name": "Blubb",
      "type": "unipolar",
      "value": 0.2,
      "id": 2
    },
    {
      "name": "Rappatoff",
      "type": "unipolar",
      "value": 0.3,
      "id": 3
    }
  ],
  "patch": "Some stupid patch"
}
`.trim(),
  "Given parameters that are not from a known device, the device returned should be correct"
);
