const { unknownDevice } = require("./constants");
const rackDevices = require("./rackDevices");

function getRackDeviceName(id) {
  return (
    rackDevices.find((device) => device.id === id)?.name || unknownDevice.name
  );
}

module.exports = getRackDeviceName;
