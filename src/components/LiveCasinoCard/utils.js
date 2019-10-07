// @flow
import { cond, flip, isNil, pipe, prop, T, when, propOr } from "ramda";
import { EVOLUTION_LOBBY_TYPES as TYPES } from "Src/constants";

const COLORS = {
  BLACK: "chrome-dark-2",
  RED: "red-support",
  GREEN: "green",
  YELLOW: "caution",
  BLUE: "info",
  PURPLE: "purple-5",
  ORANGE: "warning",
  GREY_LIGHT_1: "grey-light-1",
};

/* Roulette */

export const rouletteResults = {
  [COLORS.RED]: [
    "1",
    "3",
    "5",
    "7",
    "9",
    "12",
    "14",
    "16",
    "18",
    "19",
    "21",
    "23",
    "25",
    "27",
    "30",
    "32",
    "34",
    "36",
  ],
  [COLORS.BLACK]: [
    "2",
    "4",
    "6",
    "8",
    "10",
    "11",
    "13",
    "15",
    "17",
    "20",
    "22",
    "24",
    "26",
    "28",
    "29",
    "31",
    "33",
    "35",
  ],
  [COLORS.GREEN]: ["0", "00"],
};

const isRed = n => rouletteResults[COLORS.RED].includes(n.toString());
const isBlack = n => rouletteResults[COLORS.BLACK].includes(n.toString());

const getRouletteColor = cond([
  [isBlack, () => COLORS.BLACK],
  [isRed, () => COLORS.RED],
  [T, () => COLORS.GREEN],
]);

/* Money Wheel */

const moneyWheelResults = {
  "01": COLORS.YELLOW,
  "02": COLORS.BLUE,
  "05": COLORS.PURPLE,
  "10": COLORS.GREEN,
  "20": COLORS.ORANGE,
  "40": COLORS.RED,
};

const getMoneyWheelColor = pipe(
  flip(prop)(moneyWheelResults),
  when(isNil, () => COLORS.BLACK)
);

/* Top Card */

export const topCardLettersDisplay = { L: "H", S: "D", R: "A" };

const topCardResults = {
  L: COLORS.RED,
  S: COLORS.YELLOW,
  R: COLORS.BLUE,
};

const getTopCardColor = pipe(
  flip(prop)(topCardResults),
  when(isNil, () => COLORS.BLACK)
);

/* Monopoly */

const monopolyResultsDisplay = {
  "2r": "2",
  "4r": "4",
  ch: "?", // `ch` stands for "Chance" so we display `?`
};

const monopolyResultsColors = {
  "1": COLORS.GREY_LIGHT_1,
  "2": COLORS.GREEN,
  "5": COLORS.RED,
  "10": COLORS.BLUE,
  "2r": COLORS.BLACK,
  "4r": COLORS.BLACK,
  ch: COLORS.ORANGE,
};

const monopolyResultsBorderColor = {
  "2r": COLORS.GREY_LIGHT_1,
  "4r": COLORS.YELLOW,
};

const getMonopolyColor = pipe(
  flip(prop)(monopolyResultsColors),
  when(isNil, () => COLORS.BLACK)
);

/* Baccarat */

const baccaratHistoryColors = {
  P: COLORS.BLUE,
  T: COLORS.GREEN,
  B: COLORS.RED,
};

const getBaccaratColor = pipe(
  flip(prop)(baccaratHistoryColors),
  when(isNil, () => COLORS.BLACK)
);

export const getBadgeColor = (type: string, n: string) => {
  if (type === TYPES.MONEYWHEEL) {
    return getMoneyWheelColor(n);
  }
  if (type === TYPES.ROULETTE) {
    return getRouletteColor(n);
  }
  if (type === TYPES.TOPCARD) {
    return getTopCardColor(n);
  }
  if (type === TYPES.MONOPOLY) {
    return getMonopolyColor(n);
  }
  if (type === TYPES.BACCARAT) {
    return getBaccaratColor(n);
  }

  return COLORS.BLACK;
};

export const getBadgeBorderColor = (type: string, n: string) => {
  if (type === TYPES.MONOPOLY) {
    return prop(n, monopolyResultsBorderColor);
  }

  return null;
};

export const getResultsDisplay = (type: string, n: string) => {
  if (type === TYPES.TOPCARD) {
    return propOr(n, n, topCardLettersDisplay);
  }

  if (type === TYPES.MONOPOLY) {
    return propOr(n, n, monopolyResultsDisplay);
  }

  return isNaN(parseInt(n, 10)) ? n : parseInt(n, 10);
};
