// @flow
export const BASE_POINTS = 2;

export const getBoostersConfig = () => ({
  bigWins: {
    base: 20,
    extra: 35,
    showExtraAfter: 2,
  },
  megaWins: {
    base: 100,
  },
  triples: {
    base: BASE_POINTS,
    extra: 5,
    showExtraAfter: 1,
  },
  wins: {
    base: BASE_POINTS,
  },
  winsInARow: {
    base: BASE_POINTS,
    extra: 5,
    showExtraAfter: 3,
  },
});
