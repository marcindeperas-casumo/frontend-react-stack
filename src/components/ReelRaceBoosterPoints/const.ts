const BASE_POINTS = 2;
const NAMESPACE = "REEL_RACE_BOOSTERS";

export const UPDATE_ANIMATION = `${NAMESPACE}/UPDATE_ANIMATION`;
export const UPDATE_PREV_VALUES = `${NAMESPACE}/UPDATE_PREV_VALUES`;

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
});

export const getInitialState = () => ({
  animation: {
    active: false,
    basePoints: null,
    extraPoints: null,
  },
  boosters: {
    bigWins: 0,
    megaWins: 0,
    triples: 0,
    wins: 0,
  },
});
