const determineRackDevice = require("./determineRackDevice");
const getRackDeviceName = require("./getRackDeviceName");

class VstManager {
  #params = new Map();
  #currentId = 0;

  #controls = [];
  #switches = [];

  constructor() {}

  clear() {
    this.#params.clear();
    this.#currentId = 0;
    this.#controls = [];
    this.#switches = [];
  }

  add(value) {
    this.#currentId++;
    if (this.#isIgnored(value)) {
      return;
    }
    const tokens = value.split(":");
    const device = tokens.length === 1 ? "{GLOBAL}" : tokens[0];
    const name = tokens.length === 1 ? tokens[0] : tokens[1];

    this.#params.set(this.#currentId, {
      device,
      name,
      value: null,
      id: this.#currentId,
    });
  }

  ids(outlet) {
    for (const param of this.#params.values()) {
      outlet(0, param.id);
    }
  }

  set(id, value) {
    const param = this.#params.get(id);
    if (!param) {
      throw new Error(`No param found for ID ${id}`);
    }
    param.value = value;
  }

  print() {
    post("********** PARAMETERS **********\n");
    for (const param of this.#params.values()) {
      post(
        `${param.id} — ${param.device} – ${param.name}: ${param.value}${
          param.isCombinator
            ? ` (${param.isTopCombinator ? "Top " : ""}Combinator${
                param.type ? ` ${param.type}` : ""
              })`
            : ` (${getRackDeviceName(param.deviceType)})`
        }\n`
      );
    }
    post("********** CONTROLS **********\n");
    for (const param of this.#controls) {
      post(`${param.id} — ${param.name}: ${param.value}\n`);
    }
    post("********** SWITCHES **********\n");
    for (const param of this.#switches) {
      post(`${param.id} — ${param.name}: ${param.value}\n`);
    }
  }

  print2() {
    post("\n");
    for (const param of this.#params.values()) {
      if (param.device === "MIDI Out Device" || param.device === "{GLOBAL}") {
        continue;
      }
      post(`"${param.name}",`);
    }
  }

  analyse() {
    const devices = {};

    for (const param of this.#params.values()) {
      if (!devices[param.device]) {
        devices[param.device] = [];
      }
      devices[param.device].push(param);
    }

    let isTopCombinator = true;
    for (const params of Object.values(devices)) {
      const rackDevice = determineRackDevice(params);
      for (const param of params) {
        param.deviceType = rackDevice.id;
      }
      if (rackDevice.id === "combinator") {
        let parameterIndex = 0;
        for (const param of params) {
          if (param.name.match(/^Unused (Control|Switch) [0-9]+$/)) {
            this.#params.delete(param.id);
          } else {
            param.isCombinator = true;
            param.isTopCombinator = isTopCombinator;
            if (parameterIndex < 32) {
              param.type = "Control";
              if (isTopCombinator) {
                this.#controls.push(param);
              }
            } else if (parameterIndex < 64) {
              param.type = "Switch";
              if (isTopCombinator) {
                this.#switches.push(param);
              }
            }
          }
          parameterIndex++;
        }
        isTopCombinator = false;
      } else {
        for (const param of params) {
          param.isCombinator = false;
        }
      }
    }
  }

  #isIgnored = (value) => value.startsWith("Param ");
}

module.exports = VstManager;
