/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ValuableDetails_PlayerValuable
// ====================================================

export type ValuableDetails_PlayerValuable_PlayerValuableDeposit = {
  __typename: "PlayerValuableDeposit" | "PlayerValuableSport",
  id: string,
  backgroundImage: string,
  content: string,
  caveat: ?string,
  expirationTimeInHours: number,
  valuableType: ValuableType,
  valuableState: PlayerValuableState,
};

export type ValuableDetails_PlayerValuable_PlayerValuableSpins_game = {
  slug: string
};

export type ValuableDetails_PlayerValuable_PlayerValuableSpins = {
  __typename: "PlayerValuableSpins",
  id: string,
  backgroundImage: string,
  content: string,
  caveat: ?string,
  expirationTimeInHours: number,
  valuableType: ValuableType,
  valuableState: PlayerValuableState,
  requirementType: ?RequirementType,
  game: ?ValuableDetails_PlayerValuable_PlayerValuableSpins_game,
};

export type ValuableDetails_PlayerValuable_PlayerValuableCash = {
  __typename: "PlayerValuableCash",
  id: string,
  backgroundImage: string,
  content: string,
  caveat: ?string,
  expirationTimeInHours: number,
  valuableType: ValuableType,
  valuableState: PlayerValuableState,
  requirementType: ?RequirementType,
};

export type ValuableDetails_PlayerValuable = ValuableDetails_PlayerValuable_PlayerValuableDeposit | ValuableDetails_PlayerValuable_PlayerValuableSpins | ValuableDetails_PlayerValuable_PlayerValuableCash;/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 
 */
export type PlayerValuableState = "Consumed" | "Expired" | "Fresh" | "Locked" | "Used";

/**
 * 
 */
export type ValuableType = "cash" | "deposit" | "spins" | "sport";

/**
 * 
 */
export type Currency = "CAD" | "DKK" | "EUR" | "GBP";

/**
 * 
 */
export type RequirementType = "deposit" | "wager";

export type ContactSettingsInput = {|
  on: boolean
|};

export type UpdateRealityCheckIntervalInput = {|
  intervalSeconds: number
|};

//==============================================================
// END Enums and Input Objects
//==============================================================