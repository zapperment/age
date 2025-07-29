const playSwitchLabels = require("./playSwitchLabels");

function isPlaySwitch(name) {
  return playSwitchLabels.includes(name);
}

module.exports = isPlaySwitch;
