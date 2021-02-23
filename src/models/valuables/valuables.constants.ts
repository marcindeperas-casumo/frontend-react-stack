// @flow
import * as A from "Types/apollo";

// @ts-expect-error ts-migrate(1170) FIXME: A computed property name in a type literal must re... Remove this comment to see the full error message
export const VALUABLE_TYPES: { [string]: A.ValuableType } = {
  CASH: "cash",
  SPINS: "spins",
  DEPOSIT: "deposit",
  SPORT: "sport",
  FREE_BET: "freeBet",
  CASHBACK: "cashback",
  WAGERING_LOCK: "wageringLock",
};

// @ts-expect-error ts-migrate(1170) FIXME: A computed property name in a type literal must re... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(1170) FIXME: A computed property name in a type literal must re... Remove this comment to see the full error message
export const VALUABLE_REQUIREMENT_TYPES: { [string]: A.RequirementType } = {
  WAGER: "wager",
  DEPOSIT: "deposit",
};

export const VALUABLE_LOCKED_URL = "/player/valuables";
export const VALUABLE_DEPOSIT_URL = "/cash/deposit";
