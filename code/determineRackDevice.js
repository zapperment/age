const rackDevices = require("./rackDevices");
const { unknownDevice, placeholderParam } = require("./constants");

function determineRackDevice(params) {
  for (const rackDevice of rackDevices) {
    if (rackDevice.params.length !== params.length) {
      continue;
    }
    const paramNames = params.map((param) => param.name);
    if (
      rackDevice.params.every(
        (param) => param === placeholderParam || paramNames.includes(param)
      )
    ) {
      return rackDevice;
    }
  }
  return { ...unknownDevice, params: params.map((param) => param.name) };
}

module.exports = determineRackDevice;
