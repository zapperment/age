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
  beatLampColours: [21, 21, 21, 21, 21, 13, 13, 5],
  beatsPerBar: 4, // todo: make this configurable
  numberOfBeatLamps: 8,
  numberOfPads: 64,
  defaultMidiOutletIndex: 0,
  defaultSimPadControlOutletIndex: 1,
  defaultRackTogglerOutletIndex: 2,
  ppq: 480, // resolution of the Max/MSP clock; 480 ticks per quarter note
  metroInterval: 15, // metro interval in ticks
  unknownDevice: {
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
