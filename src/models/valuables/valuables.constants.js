// @flow
import * as A from "Types/apollo";

export const VALUABLE_TYPES: { [string]: A.ValuableType } = {
  CASH: "cash",
  SPINS: "spins",
  DEPOSIT: "deposit",
  SPORT: "sport",
  FREE_BET: "freeBet",
  CASHBACK: "cashback",
};

export const VALUABLE_STATES: { [string]: A.PlayerValuableState } = {
  FRESH: "Fresh",
  USED: "Used",
  LOCKED: "Locked",
};

export const VALUABLE_SPIN_TYPES = Object.freeze({
  BASIC_SPINS: "basic_spins",
  BONUS: "bonus",
  SUPER: "super",
  MEGA: "mega",
});

export const VALUABLE_REQUIREMENT_TYPES: { [string]: A.RequirementType } = {
  WAGER: "wager",
  DEPOSIT: "deposit",
};

export const VALUABLE_LOCKED_URL = "/player/valuables";
export const VALUABLE_DEPOSIT_URL = "/cash/deposit";
