/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: PlayerValuableList_PlayerValuable
// ====================================================

export type PlayerValuableList_PlayerValuable_PlayerValuableCash = {
  id: string,
  title: string,
  valuableState: PlayerValuableState,
  valuableType: ValuableType,
  expirationTimeInHours: number,
  currency: Currency,
  market: string,
  caveat: ?string,
  magnitude: number,
  backgroundImage: string,
};

export type PlayerValuableList_PlayerValuable_PlayerValuableSpins_game = {
  slug: string,
  title: string,
  backgroundImage: string,
};

export type PlayerValuableList_PlayerValuable_PlayerValuableSpins = {
  id: string,
  title: string,
  valuableState: PlayerValuableState,
  valuableType: ValuableType,
  expirationTimeInHours: number,
  currency: Currency,
  market: string,
  caveat: ?string,
  coinValue: number,
  magnitude: number,
  game: PlayerValuableList_PlayerValuable_PlayerValuableSpins_game,
};

export type PlayerValuableList_PlayerValuable_PlayerValuableDeposit = {
  id: string,
  title: string,
  valuableState: PlayerValuableState,
  valuableType: ValuableType,
  expirationTimeInHours: number,
  currency: Currency,
  market: string,
  caveat: ?string,
  magnitude: number,
  backgroundImage: string,
};

export type PlayerValuableList_PlayerValuable_PlayerValuableSport = {
  id: string,
  title: string,
  valuableState: PlayerValuableState,
  valuableType: ValuableType,
  expirationTimeInHours: number,
  currency: Currency,
  market: string,
  caveat: ?string,
  backgroundImage: string,
};

export type PlayerValuableList_PlayerValuable = PlayerValuableList_PlayerValuable_PlayerValuableCash | PlayerValuableList_PlayerValuable_PlayerValuableSpins | PlayerValuableList_PlayerValuable_PlayerValuableDeposit | PlayerValuableList_PlayerValuable_PlayerValuableSport;/* @flow */
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

export type ContactSettingsInput = {|
  on: boolean
|};

export type UpdateRealityCheckIntervalInput = {|
  intervalSeconds: number
|};

//==============================================================
// END Enums and Input Objects
//==============================================================