const rackDevices = require("./rackDevices");
const isCombinatorDevice = require("./isCombinatorDevice");
const { unknownDevice, paramType } = require("./constants");

function determineRackDevice(patch, params) {
  let device = null;
  if (isCombinatorDevice(params)) {
    device = {
      id: "combinator",
      name: "Combinator",
      vendor: "Reason Studios",
      type: "Utility",
      params: [],
      patch,
    };
    let parameterIndex = 0;
    for (const param of params) {
      if (!param.name.match(/^Unused (Control|Switch) [0-9]+$/)) {
        if (parameterIndex < 32) {
          device.params.push({
            name: param.name,
            type: paramType.control,
            value: param.value,
            id: param.id,
          });
        } else if (parameterIndex < 64) {
          device.params.push({
            name: param.name,
            type: paramType.switch,
            value: param.value,
            id: param.id,
          });
        } else if (param.name === "Enabled") {
          device.params.push({
            name: param.name,
            type: paramType.enabled,
            value: param.value,
            id: param.id,
          });
        } else if (param.name === "Mixer Level") {
          device.params.push({
            name: param.name,
            type: paramType.unipolar,
            value: param.value,
            id: param.id,
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
      params: device.params.map((param) => {
        const rawParam = params.find((p) => p.name === param.name);
        return {
          name: param.name,
          type: param.type,
          value: rawParam.value,
          id: rawParam.id,
        };
      }),
      patch,
    };
  }

  return {
    ...unknownDevice,
    params: params.map((param) => {
      const rawParam = params.find((p) => p.name === param.name);
      return {
        name: param.name,
        type: paramType.unipolar,
        value: rawParam.value,
        id: rawParam.id,
      };
    }),
    patch,
  };
}

module.exports = determineRackDevice;
