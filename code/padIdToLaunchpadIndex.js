module.exports = (padId) => {
  const zeroBasedPadId = parseInt(padId, 10) - 1;
  const clipRow = Math.floor(zeroBasedPadId / 8);
  const clipCol = zeroBasedPadId % 8;
  const padRow = 8 - clipRow;
  const padCol = clipCol + 1;
  return padRow * 10 + padCol;
};
