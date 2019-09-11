/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetFavourites
// ====================================================

export type SetFavourites_setFavouriteGroups = {
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
};

export type SetFavourites = {
  setFavouriteGroups: Array<SetFavourites_setFavouriteGroups>
};

export type SetFavouritesVariables = {
  ids: Array<number>
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

/**
 *
 */
export type Vertical = "CASINO" | "SPORTS";

/**
 * 
 */
export type SearchResultType = "LEAGUE" | "PARTICIPANT" | "REGION" | "SPORT";

/**
 * 
 */
export type Modal = "BETTING_GLOSSARY" | "CHOOSE_FAVOURITES" | "CHOOSE_FAVOURITE_COMPETITIONS" | "SEARCH";

export type ContactSettingsInput = {|
  on: boolean
|};

export type UpdateRealityCheckIntervalInput = {|
  intervalSeconds: number
|};

//==============================================================
// END Enums and Input Objects
//==============================================================