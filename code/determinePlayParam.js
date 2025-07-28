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

function determinePlayParam(devices, params) {
  for (const deviceName of deviceNamesByPriority) {
    for (const device of devices.values()) {
      if (device.name === deviceName) {
        const playParam = device.params.find((paramId) => {
          const param = params.get(paramId);
          return param && param.type === paramType.play;
        });
        if (playParam) {
          return playParam;
        }
      }
    }
  }
  post(`No play param found in any device\n`);
  return null;
}

module.exports = determinePlayParam;
