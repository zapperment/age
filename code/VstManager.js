const determineRackDevice = require("./determineRackDevice");
const determinePlayParam = require("./determinePlayParam");

class VstManager {
  #devices = new Map();
  #currentDeviceId = 0;

  #params = new Map();
  #currentParamId = 0;

  #playParamId = null;

  #ignoredParamIds = new Set();

  constructor() {}

  clear() {
    this.#devices.clear();
    this.#currentDeviceId = 0;

    this.#params.clear();
    this.#currentParamId = 0;

    this.#ignoredParamIds.clear();

    this.#playParamId = null;
  }

  addParam(rawParam) {
    this.#currentParamId++;
    if (this.#isIgnored(rawParam)) {
      this.#ignoredParamIds.add(this.#currentParamId);
      return;
    }
    const tokens = rawParam.split(":");
    const patch = tokens.length === 1 ? "" : tokens[0];
    const name = tokens.length === 1 ? tokens[0] : tokens[1];

    this.#params.set(this.#currentParamId, {
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
    for (const param of this.#params.values()) {
      outlet(0, ["get", param.id]);
    }
  }

  setParamValue(paramId, value) {
    if (this.#ignoredParamIds.has(paramId)) {
      return;
    }
    const param = this.#params.get(paramId);
    if (!param) {
      throw new Error(`No param found for parameter ID ${paramId}`);
    }
    param.value = value;
  }

  analyse() {
    this.#determineDevices();
    this.#determinePlayParam();
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
      const params = device.params.map((id) => this.#params.get(id));
      for (const param of params) {
        post(`    ${param.name} = ${param.value}\n`);
        post(`      ID:   ${param.id}\n`);
        post(`      Type: ${param.type}\n`);
      }
    }
  }

  #isIgnored = (value) => value.startsWith("Param ");

  #determineDevices = () => {
    const paramsByPatch = {};

    for (const param of this.#params.values()) {
      if (!paramsByPatch[param.patch]) {
        paramsByPatch[param.patch] = [];
      }
      paramsByPatch[param.patch].push(param);
    }

    for (const [patch, params] of Object.entries(paramsByPatch)) {
      this.#currentDeviceId++;
      const device = determineRackDevice(this.#currentDeviceId, patch, params);
      for (const param of device.params) {
        this.#params.set(param.id, param);
      }
      device.params = device.params.map((param) => param.id);
      this.#devices.set(this.#currentDeviceId, device);
    }
  };

  #determinePlayParam = () => {
    this.#playParamId = determinePlayParam(this.#devices);
  };
}

module.exports = VstManager;
