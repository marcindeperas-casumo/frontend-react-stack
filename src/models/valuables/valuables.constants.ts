export const VALUABLE_TYPES = {
  CASH: "cash",
  SPINS: "spins",
  DEPOSIT: "deposit",
  SPORT: "sport",
  FREE_BET: "freeBet",
  LIVE_CASINO_FREE_BET: "liveCasinoFreeBet",
  CASHBACK: "cashback",
  WAGERING_LOCK: "wageringLock",
  BUNDLE_LOCK: "bundleLock",
  CHRISTMAS_SPECIAL: "christmasSpecial",
  CHRISTMAS_SPECIAL_DEPOSIT_SILVER: "christmasDepositSilver",
  CHRISTMAS_SPECIAL_DEPOSIT_GOLD: "christmasDepositGold",
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

export const VALUABLE_CIRCLE_LOCK_ICON = "lock";
export const VALUABLE_CIRCLE_CLAIM_ICON = "claim";

export const VALUABLE_LOCKED_URL = "/player/valuables";
export const VALUABLE_DEPOSIT_URL = "/cash/deposit";
