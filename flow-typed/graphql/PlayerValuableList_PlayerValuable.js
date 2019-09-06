/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlayerValuableList_PlayerValuable
// ====================================================

export type PlayerValuableList_PlayerValuable_PlayerValuableSport = {
  __typename: "PlayerValuableSport",
  id: string,
  valuableState: PlayerValuableState,
  expirationTimeInHours: number,
  valuableType: ValuableType,
  title: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  backgroundImage: string,
};

export type PlayerValuableList_PlayerValuable_PlayerValuableSpins_game = {
  slug: string
};

export type PlayerValuableList_PlayerValuable_PlayerValuableSpins = {
  __typename: "PlayerValuableSpins",
  id: string,
  valuableState: PlayerValuableState,
  expirationTimeInHours: number,
  valuableType: ValuableType,
  title: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  backgroundImage: string,
  description: string,
  coinValue: number,
  requirementType: ?RequirementType,
  game: ?PlayerValuableList_PlayerValuable_PlayerValuableSpins_game,
  wageringThreshold: ?number,
  leftToWager: ?number,
};

export type PlayerValuableList_PlayerValuable_PlayerValuableCash = {
  __typename: "PlayerValuableCash",
  id: string,
  valuableState: PlayerValuableState,
  expirationTimeInHours: number,
  valuableType: ValuableType,
  title: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  backgroundImage: string,
  requirementType: ?RequirementType,
  wageringThreshold: ?number,
  leftToWager: ?number,
};

export type PlayerValuableList_PlayerValuable_PlayerValuableDeposit = {
  __typename: "PlayerValuableDeposit",
  id: string,
  valuableState: PlayerValuableState,
  expirationTimeInHours: number,
  valuableType: ValuableType,
  title: string,
  content: string,
  caveat: ?string,
  currency: Currency,
  market: string,
  backgroundImage: string,
  wageringThreshold: ?number,
  leftToWager: ?number,
};

export type PlayerValuableList_PlayerValuable = PlayerValuableList_PlayerValuable_PlayerValuableSport | PlayerValuableList_PlayerValuable_PlayerValuableSpins | PlayerValuableList_PlayerValuable_PlayerValuableCash | PlayerValuableList_PlayerValuable_PlayerValuableDeposit;/* @flow */
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