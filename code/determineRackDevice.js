const rackDevices = require("./rackDevices");
const isCombinatorDevice = require("./isCombinatorDevice");
const isPlaySwitch = require("./isPlaySwitch");
const { unknownDevice, paramType } = require("./constants");

function determineRackDevice(id, patch, params) {
  let device = null;
  if (isCombinatorDevice(params)) {
    device = {
      id,
      name: "Combinator",
      vendor: "Reason Studios",
      type: "Utility",
      params: [],
      patch,
    };
    let parameterIndex = 0;
    let hasPlaySwitch = false;
    for (const param of params) {
      if (!param.name.match(/^Unused (Control|Switch) [0-9]+$/)) {
        if (parameterIndex < 32) {
          device.params.push({
            id: param.id,
            name: param.name,
            type: paramType.control,
            value: param.value,
          });
        } else if (parameterIndex < 64) {
          let type = paramType.switch;
          if (isPlaySwitch(param.name) && !hasPlaySwitch) {
            type = paramType.play;
            hasPlaySwitch = true;
          }
          device.params.push({
            id: param.id,
            name: param.name,
            type,
            value: param.value,
          });
        } else if (param.name === "Enabled") {
          device.params.push({
            id: param.id,
            name: param.name,
            type: paramType.enabled,
            value: param.value,
          });
        } else if (param.name === "Mixer Level") {
          device.params.push({
            id: param.id,
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
      id,
      ...device,
      params: device.params.map((param) => {
        const rawParam = params.find((p) => p.name === param.name);
        return {
          id: rawParam.id,
          name: param.name,
          type: param.type,
          value: rawParam.value,
        };
      }),
      patch,
    };
  }

  return {
    id,
    ...unknownDevice,
    params: params.map((param) => {
      const rawParam = params.find((p) => p.name === param.name);
      return {
        id: rawParam.id,
        name: param.name,
        type: paramType.unipolar,
        value: rawParam.value,
      };
    }),
    patch,
  };
}

module.exports = determineRackDevice;
