export const VALUABLE_TYPES = {
  CASH: "cash",
  SPINS: "spins",
  DEPOSIT: "deposit",
  SPORT: "sport",
  FREE_BET: "freeBet",
  CASHBACK: "cashback",
  WAGERING_LOCK: "wageringLock",
} as const;

export const VALUABLE_STATES = {
  FRESH: "Fresh",
  USED: "Used",
  LOCKED: "Locked",
} as const;

export const VALUABLE_SPIN_TYPES = {
  BASIC_SPINS: "basic_spins",
  BONUS: "bonus",
  SUPER: "super",
  MEGA: "mega",
} as const;

export const VALUABLE_REQUIREMENT_TYPES = {
  WAGER: "wager",
  DEPOSIT: "deposit",
  KAMBI_SPORTS_BET: "kambiSportsBet",
} as const;

export const VALUABLE_LOCKED_URL = "/player/valuables";
export const VALUABLE_DEPOSIT_URL = "/cash/deposit";
