function isCombinatorDevice(params) {
  return (
    params.length === 66 &&
    params[64].name === "Enabled" &&
    params[65].name === "Mixer Level"
  );
}

module.exports = isCombinatorDevice;
