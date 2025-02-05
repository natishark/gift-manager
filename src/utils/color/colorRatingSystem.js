function getColorByRate(theme, rate, number) {
  return theme.bestOptionColor
    .sub(theme.worstOptionColor)
    .divScalar(number - 1)
    .mulScalar(rate)
    .add(theme.worstOptionColor);
}

function generateColorSequence(theme, number) {
  if (number < 2) {
    throw new TypeError("Ratings number should be at least 2.");
  }

  const seq = [];

  for (let i = 0; i < number; i++) {
    seq.push(getColorByRate(theme, i, number))
  }

  return seq;
}

export { generateColorSequence, getColorByRate };
