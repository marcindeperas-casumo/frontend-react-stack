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

// TODO: replace with graphql types
export const VALUABLE_REQUIREMENT_TYPES = Object.freeze({
  WAGER: "wager",
  DEPOSIT: "deposit",
});
