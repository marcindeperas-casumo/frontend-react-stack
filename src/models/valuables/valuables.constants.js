export const VALUABLE_TYPES = {
  CASH: "cash",
  SPINS: "spins",
  DEPOSIT: "deposit",
  SPORT: "sport",
};

export const valuableToColor = {
  [VALUABLE_TYPES.CASH]: {
    background: "yellow-light-3", // brown?
    coin: "yellow",
  },
  [VALUABLE_TYPES.SPINS]: {
    background: "grey-light-2",
    coin: "grey-dark-3",
  },
  [VALUABLE_TYPES.DEPOSIT]: {
    background: "blue-light-3",
    coin: "blue-light-1",
  },
  [VALUABLE_TYPES.SPORT]: {
    background: "green-light-3",
    coin: "green-dark-1",
  },
  default: {
    background: "grey-light-2",
    coin: "grey",
  },
};
