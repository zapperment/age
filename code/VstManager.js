const determineRackDevice = require("./determineRackDevice");
const getRackDeviceName = require("./getRackDeviceName");

class VstManager {
  #rawParams = new Map();
  #currentParamId = 0;

  #devices = [];

  constructor() {}

  clear() {
    this.#devices = [];
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

  paramIds(outlet) {
    for (const param of this.#rawParams.values()) {
      outlet(0, param.id);
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
    for (const device of this.#devices) {
      post(
        device.patch
          ? `${device.patch} (${device.name}${
              device.byName ? ` ${device.byName}` : ""
            })\n`
          : `${device.name}\n`
      );
      for (const param of device.params) {
        post(`  ${param.name}: ${param.value}\n`);
      }
    }
  }

  analyse() {
    const paramsByPatch = {};

    for (const param of this.#rawParams.values()) {
      if (!paramsByPatch[param.patch]) {
        paramsByPatch[param.patch] = [];
      }
      paramsByPatch[param.patch].push(param);
    }

    for (const [patch, params] of Object.entries(paramsByPatch)) {
      this.#devices.push(determineRackDevice(patch, params));
    }
  }

  #isIgnored = (value) => value.startsWith("Param ");
}

module.exports = VstManager;
