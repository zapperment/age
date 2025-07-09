module.exports = (clipIndex) => {
  const clipRow = Math.floor(clipIndex / 8);
  const clipCol = clipIndex % 8;
  const padRow = 8 - clipRow;
  const padCol = clipCol + 1;
  return padRow * 10 + padCol;
};
