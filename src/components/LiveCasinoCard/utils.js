import { cond, flip, isNil, pipe, prop, T, when } from "ramda";

const COLORS = {
  BLACK: "grey-dark-2",
  RED: "red",
  GREEN: "green-light-1",
  YELLOW: "yellow",
  BLUE: "blue-light-1",
  PURPLE: "purple",
  ORANGE: "orange",
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

export const topCardLetters = { L: "H", T: "D", R: "A" };

const topCardResults = {
  L: "red",
  T: "yellow",
  R: "blue-light-1",
};

const getTopCardColor = pipe(
  flip(prop)(topCardResults),
  when(isNil, () => COLORS.BLACK)
);

export const getBadgeColor = (type, n) => {
  if (type === "MoneyWheel") return getMoneyWheelColor(n);
  if (type === "Roulette") return getRouletteColor(n);
  if (type === "TopCard") return getTopCardColor(n);
};
