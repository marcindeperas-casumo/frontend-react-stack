// @flow
export const VALUABLE_TYPES: { [string]: ValuableType } = {
  CASH: "cash",
  SPINS: "spins",
  DEPOSIT: "deposit",
  SPORT: "sport",
};

export const VALUABLE_STATES: { [string]: PlayerValuableState } = {
  FRESH: "Fresh",
  LOCKED: "Locked",
};

export const VALUABLE_SPIN_TYPES = Object.freeze({
  BASIC_SPINS: "basic_spins",
  BONUS: "bonus",
  SUPER: "super",
  MEGA: "mega",
});

export const VALUABLE_LOCKED_URL = "/en/player/valuables";
export const VALUABLE_DEPOSIT_URL = "/en/cash/deposit";
