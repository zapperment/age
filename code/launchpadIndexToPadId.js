module.exports = (padIndex) =>
  `${(8 - Math.floor(padIndex / 10)) * 8 + (padIndex % 10)}`;
