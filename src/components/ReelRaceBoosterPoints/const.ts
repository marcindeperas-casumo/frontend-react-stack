// @flow
const BASE_POINTS = 2;
const NAMESPACE = "REEL_RACE_BOOSTERS";

// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Function'... Remove this comment to see the full error message
export const UPDATE_ANIMATION: Function = `${NAMESPACE}/UPDATE_ANIMATION`;
// @ts-expect-error ts-migrate(2322) FIXME: Type 'string' is not assignable to type 'Function'... Remove this comment to see the full error message
export const UPDATE_PREV_VALUES: Function = `${NAMESPACE}/UPDATE_PREV_VALUES`;

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
