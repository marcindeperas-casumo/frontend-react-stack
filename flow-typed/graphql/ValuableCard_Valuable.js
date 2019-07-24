/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: ValuableCard_Valuable
// ====================================================

export type ValuableCard_Valuable_PlayerValuableCash = {
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

export type ValuableCard_Valuable_PlayerValuableSpins_game = {
  slug: string,
  title: string,
  backgroundImage: string,
};

export type ValuableCard_Valuable_PlayerValuableSpins = {
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
  game: ValuableCard_Valuable_PlayerValuableSpins_game,
};

export type ValuableCard_Valuable_PlayerValuableDeposit = {
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

export type ValuableCard_Valuable_PlayerValuableSport = {
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

export type ValuableCard_Valuable = ValuableCard_Valuable_PlayerValuableCash | ValuableCard_Valuable_PlayerValuableSpins | ValuableCard_Valuable_PlayerValuableDeposit | ValuableCard_Valuable_PlayerValuableSport;/* @flow */
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