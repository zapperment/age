const assert = require("node:assert");

const getRackDeviceName = require("./getRackDeviceName");

assert(
  getRackDeviceName("combinator") === "Combinator",
  "The name of the combinator device should be 'Combinator'"
);
assert(
  getRackDeviceName("scalesAndChords") === "Scales & Chords",
  "The name of the scales & chords device should be 'Scales & Chords'"
);
assert(
  getRackDeviceName("flitzi") === "Unknown Device",
  "The name of the unknown device should be 'Unknown Device'"
);
