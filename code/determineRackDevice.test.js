const assert = require("node:assert");

const determineRackDevice = require("./determineRackDevice");

assert(
  JSON.stringify(
    determineRackDevice([
      { name: "Singen", value: 0.23 },
      { name: "Tanzen", value: 0.88 },
      { name: "Lachen", value: 0.1 },
      { name: "Unused Control 4", value: 0 },
      { name: "Unused Control 5", value: 0 },
      { name: "Unused Control 6", value: 0 },
      { name: "Unused Control 7", value: 0 },
      { name: "Unused Control 8", value: 0 },
      { name: "Unused Control 9", value: 0 },
      { name: "Unused Control 10", value: 0 },
      { name: "Unused Control 11", value: 0 },
      { name: "Unused Control 12", value: 0 },
      { name: "Unused Control 13", value: 0 },
      { name: "Unused Control 14", value: 0 },
      { name: "Unused Control 15", value: 0 },
      { name: "Unused Control 16", value: 0 },
      { name: "Unused Control 17", value: 0 },
      { name: "Unused Control 18", value: 0 },
      { name: "Unused Control 19", value: 0 },
      { name: "Unused Control 20", value: 0 },
      { name: "Unused Control 21", value: 0 },
      { name: "Unused Control 22", value: 0 },
      { name: "Unused Control 23", value: 0 },
      { name: "Unused Control 24", value: 0 },
      { name: "Unused Control 25", value: 0 },
      { name: "Unused Control 26", value: 0 },
      { name: "Unused Control 27", value: 0 },
      { name: "Unused Control 28", value: 0 },
      { name: "Unused Control 29", value: 0 },
      { name: "Unused Control 30", value: 0 },
      { name: "Unused Control 31", value: 0 },
      { name: "Unused Control 32", value: 0 },
      { name: "Hello", value: 0.11 },
      { name: "Goodbye", value: 0.12 },
      { name: "Unused Switch 3", value: 0 },
      { name: "Unused Switch 4", value: 0 },
      { name: "Unused Switch 5", value: 0 },
      { name: "Unused Switch 6", value: 0 },
      { name: "Unused Switch 7", value: 0 },
      { name: "Unused Switch 8", value: 0 },
      { name: "Unused Switch 9", value: 0 },
      { name: "Unused Switch 10", value: 0 },
      { name: "Unused Switch 11", value: 0 },
      { name: "Unused Switch 12", value: 0 },
      { name: "Unused Switch 13", value: 0 },
      { name: "Unused Switch 14", value: 0 },
      { name: "Unused Switch 15", value: 0 },
      { name: "Unused Switch 16", value: 0 },
      { name: "Unused Switch 17", value: 0 },
      { name: "Unused Switch 18", value: 0 },
      { name: "Unused Switch 19", value: 0 },
      { name: "Unused Switch 20", value: 0 },
      { name: "Unused Switch 21", value: 0 },
      { name: "Unused Switch 22", value: 0 },
      { name: "Unused Switch 23", value: 0 },
      { name: "Unused Switch 24", value: 0 },
      { name: "Unused Switch 25", value: 0 },
      { name: "Unused Switch 26", value: 0 },
      { name: "Unused Switch 27", value: 0 },
      { name: "Unused Switch 28", value: 0 },
      { name: "Unused Switch 29", value: 0 },
      { name: "Unused Switch 30", value: 0 },
      { name: "Unused Switch 31", value: 0 },
      { name: "Unused Switch 32", value: 0 },
      { name: "Enabled", value: 1 },
      { name: "Mixer Level", value: 0.5 },
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
      "value": 0.23
    },
    {
      "name": "Tanzen",
      "type": "control",
      "value": 0.88
    },
    {
      "name": "Lachen",
      "type": "control",
      "value": 0.1
    },
    {
      "name": "Hello",
      "type": "switch",
      "value": 0.11
    },
    {
      "name": "Goodbye",
      "type": "switch",
      "value": 0.12
    },
    {
      "name": "Enabled",
      "type": "enabled",
      "value": 1
    },
    {
      "name": "Mixer Level",
      "type": "unipolar",
      "value": 0.5
    }
  ]
}
`.trim(),
  "Given Combinator device parameters, the device returned should be correct"
);

assert(
  JSON.stringify(
    determineRackDevice([
      { name: "Add Color", value: 0.1 },
      { name: "Add Octave Down", value: 0.2 },
      { name: "Add Octave Up", value: 0.3 },
      { name: "Alter", value: 0.4 },
      { name: "Chords", value: 0.5 },
      { name: "Custom Scale", value: 0.6 },
      { name: "Filter Notes", value: 0.7 },
      { name: "Inversion", value: 0.8 },
      { name: "Key", value: 0.9 },
      { name: "Nr of Notes", value: 1 },
      { name: "On", value: 1 },
      { name: "Open Chords", value: 0.1 },
      { name: "Scale", value: 0.1 },
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
      "value": 0.1
    },
    {
      "name": "Add Octave Down",
      "type": "boolean",
      "value": 0.2
    },
    {
      "name": "Add Octave Up",
      "type": "boolean",
      "value": 0.3
    },
    {
      "name": "Alter",
      "type": "boolean",
      "value": 0.4
    },
    {
      "name": "Chords",
      "type": "boolean",
      "value": 0.5
    },
    {
      "name": "Custom Scale",
      "type": "unipolar",
      "value": 0.6
    },
    {
      "name": "Filter Notes",
      "type": "boolean",
      "value": 0.7
    },
    {
      "name": "Inversion",
      "type": "unipolar",
      "value": 0.8
    },
    {
      "name": "Key",
      "type": "unipolar",
      "value": 0.9
    },
    {
      "name": "Nr of Notes",
      "type": "unipolar",
      "value": 1
    },
    {
      "name": "On",
      "type": "play",
      "value": 1
    },
    {
      "name": "Open Chords",
      "type": "boolean",
      "value": 0.1
    },
    {
      "name": "Scale",
      "type": "unipolar",
      "value": 0.1
    }
  ]
}
`.trim(),
  "Given parameters from the Scales & Chords device, the device returned should be correct"
);

assert(
  JSON.stringify(
    determineRackDevice([
      { name: "Blabla", value: 0.1 },
      { name: "Blubb", value: 0.2 },
      { name: "Rappatoff", value: 0.3 },
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
      "value": 0.1
    },
    {
      "name": "Blubb",
      "type": "unipolar",
      "value": 0.2
    },
    {
      "name": "Rappatoff",
      "type": "unipolar",
      "value": 0.3
    }
  ]
}
`.trim(),
  "Given parameters that are not from a known device, the device returned should be correct"
);
