const rackDevices = require("./rackDevices");
const isCombinatorDevice = require("./isCombinatorDevice");
const { unknownDevice, placeholderParam, paramType } = require("./constants");

function determineRackDevice(params) {
  let device = null;
  if (isCombinatorDevice(params)) {
    device = {
      id: "combinator",
      name: "Combinator",
      vendor: "Reason Studios",
      type: "Utility",
      params: [],
    };
    let parameterIndex = 0;
    for (const param of params) {
      if (!param.name.match(/^Unused (Control|Switch) [0-9]+$/)) {
        if (parameterIndex < 32) {
          device.params.push({
            name: param.name,
            type: paramType.control,
            value: param.value,
          });
        } else if (parameterIndex < 64) {
          device.params.push({
            name: param.name,
            type: paramType.switch,
            value: param.value,
          });
        } else if (param.name === "Enabled") {
          device.params.push({
            name: param.name,
            type: paramType.enabled,
            value: param.value,
          });
        } else if (param.name === "Mixer Level") {
          device.params.push({
            name: param.name,
            type: paramType.unipolar,
            value: param.value,
          });
        }
      }
      parameterIndex++;
    }
    return device;
  }

  for (const rackDevice of rackDevices) {
    if (rackDevice.params.length !== params.length) {
      continue;
    }
    const paramNames = params.map((param) => param.name);
    if (rackDevice.params.every((param) => paramNames.includes(param.name))) {
      device = rackDevice;
      break;
    }
  }

  if (device) {
    return {
      ...device,
      params: device.params.map((param) => ({
        name: param.name,
        type: param.type,
        value: params.find((p) => p.name === param.name).value,
      })),
    };
  }

  return {
    ...unknownDevice,
    params: params.map((param) => ({
      name: param.name,
      type: paramType.unipolar,
      value: param.value,
    })),
  };
}

module.exports = determineRackDevice;
