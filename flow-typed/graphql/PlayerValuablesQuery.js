/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: PlayerValuablesQuery
// ====================================================

export type PlayerValuablesQuery_translations_playerValuableTranslations = {
  hoursLabel: string,
  listTitleLabel: string,
};

export type PlayerValuablesQuery_translations = {
  playerValuableTranslations: ?PlayerValuablesQuery_translations_playerValuableTranslations
};

export type PlayerValuablesQuery_player_valuables_PlayerValuableSpins_game = {
  slug: string
};

export type PlayerValuablesQuery_player_valuables = {
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
} | {
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
  game: ?PlayerValuablesQuery_player_valuables_PlayerValuableSpins_game,
  wageringThreshold: ?number,
  leftToWager: ?number,
} | {
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
} | {
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

export type PlayerValuablesQuery_player = {
  valuables: Array<?PlayerValuablesQuery_player_valuables>
};

export type PlayerValuablesQuery = {
  translations: PlayerValuablesQuery_translations,
  player: PlayerValuablesQuery_player,
};/* @flow */
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