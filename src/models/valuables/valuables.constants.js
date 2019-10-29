// @flow
export const VALUABLE_TYPES: { [string]: gValuableType } = {
  CASH: "cash",
  SPINS: "spins",
  DEPOSIT: "deposit",
  SPORT: "sport",
};

export const VALUABLE_STATES: { [string]: gPlayerValuableState } = {
  FRESH: "Fresh",
  LOCKED: "Locked",
};

export const VALUABLE_SPIN_TYPES = Object.freeze({
  BASIC_SPINS: "basic_spins",
  BONUS: "bonus",
  SUPER: "super",
  MEGA: "mega",
});

export const VALUABLE_REQUIREMENT_TYPES: { [string]: gRequirementType } = {
  WAGER: "wager",
  DEPOSIT: "deposit",
};

export const VALUABLE_LOCKED_URL = "/en/player/valuables";
export const VALUABLE_DEPOSIT_URL = "/en/cash/deposit";
