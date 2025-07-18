module.exports = {
  mode: {
    PERFORMANCE: "performance",
    CLIP_SETUP: "clipSetup",
    RACK_SETUP: "rackSetup",
  },
  clipState: {
    EMPTY: "empty",
    STOPPED: "stopped",
    TRIGGERED: "triggered",
    PLAYING: "playing",
    STOPPING: "stopping",
  },
  padChannel: {
    STATIC: 0,
    FLASH: 1,
    PULSE: 2,
  },
  padCC: 176,
  colour: {
    COAL: {
      launchPad: 0,
      hex: "#000000",
      rgb: [0, 0, 0],
    },
    HUBBA_BUBBA: {
      launchPad: 4,
      hex: "#FF6E82",
      rgb: [1, 0.431, 0.51],
    },
    PUMPKIN: {
      launchPad: 10,
      hex: "#EA5807",
      rgb: [0.916, 0.345, 0.027],
    },
    MUSTARD: {
      launchPad: 14,
      hex: "#ADAD06",
      rgb: [0.678, 0.678, 0.025],
    },
  },
  beatLampColours: [21, 21, 21, 21, 21, 13, 13, 5],
  beatsPerBar: 4, // todo: make this configurable
  numberOfBeatLamps: 8,
  numberOfClips: 64,
  defaultMidiOutletIndex: 0,
  defaultSimPadControlOutletIndex: 1,
  defaultRackTogglerOutletIndex: 2,
  ppq: 480, // resolution of the Max/MSP clock; 480 ticks per quarter note
  metroInterval: 15, // metro interval in ticks
  placeholderParam: "*",
  unknownDevice: {
    id: "unknown",
    name: "Unknown Device",
    vendor: "Unknown",
    type: "Unknown",
  },
  paramType: {
    boolean: "boolean",
    control: "control",
    switch: "switch",
    bipolar: "bipolar",
    unipolar: "unipolar",
    enabled: "enabled",
    play: "play",
    pattern: "pattern",
  },
};
