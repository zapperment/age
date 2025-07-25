const determineRackDevice = require("./determineRackDevice");

class VstManager {
  #devices = new Map();
  #currentDeviceId = 0;

  #rawParams = new Map();
  #currentParamId = 0;

  constructor() {}

  clear() {
    this.#devices.clear();
    this.#currentDeviceId = 0;

    this.#rawParams.clear();
    this.#currentParamId = 0;
  }

  addRawParam(rawParamString) {
    this.#currentParamId++;
    if (this.#isIgnored(rawParamString)) {
      return;
    }
    const tokens = rawParamString.split(":");
    const patch = tokens.length === 1 ? "" : tokens[0];
    const name = tokens.length === 1 ? tokens[0] : tokens[1];

    this.#rawParams.set(this.#currentParamId, {
      patch,
      name,
      value: null,
      id: this.#currentParamId,
    });
  }

  getRawParams(outlet) {
    outlet(0, "params");
  }

  getParamValues(outlet) {
    for (const param of this.#rawParams.values()) {
      outlet(0, ["get", param.id]);
    }
  }

  setRawParamValue(paramId, value) {
    const param = this.#rawParams.get(paramId);
    if (!param) {
      throw new Error(`No param found for parameter ID ${paramId}`);
    }
    param.value = value;
  }

  print() {
    for (const device of this.#devices.values()) {
      post(
        device.patch
          ? `${device.patch} (${device.name}${
              device.byName ? ` ${device.byName}` : ""
            })\n`
          : `${device.name}\n`
      );
      post(`  ID:     ${device.id}\n`);
      post(`  Vendor: ${device.vendor}\n`);
      post(`  Type:   ${device.type}\n`);
      post(`  Params:\n`);
      for (const param of device.params) {
        post(`    ${param.name} = ${param.value}\n`);
        post(`      ID:   ${param.id}\n`);
        post(`      Type: ${param.type}\n`);
      }
    }
  }

  determineDevices() {
    const paramsByPatch = {};

    for (const param of this.#rawParams.values()) {
      if (!paramsByPatch[param.patch]) {
        paramsByPatch[param.patch] = [];
      }
      paramsByPatch[param.patch].push(param);
    }

    for (const [patch, params] of Object.entries(paramsByPatch)) {
      this.#currentDeviceId++;
      this.#devices.set(
        this.#currentDeviceId,
        determineRackDevice(this.#currentDeviceId, patch, params)
      );
    }
  }

  #isIgnored = (value) => value.startsWith("Param ");
}

module.exports = VstManager;
