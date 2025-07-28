const { paramType } = require("./constants");

const deviceNamesByPriority = [
  "Combinator",
  "Bassline Generator",
  "Chord Sequencer",
  "Drum Sequencer",
  "Pattern Mutator",
  "PolyStep Sequencer",
  "Beat Map",
  "Quad Note Generator",
];

function determinePlayParam(devices) {
  for (const deviceName of deviceNamesByPriority) {
    for (const device of devices.values()) {
      if (device.name === deviceName) {
        const playParam = device.params.find(
          (param) => param.type === paramType.play
        );
        if (playParam) {
          return playParam.id;
        }
      }
    }
  }
  post(`No play param found in any device\n`);
  return null;
}

module.exports = determinePlayParam;
