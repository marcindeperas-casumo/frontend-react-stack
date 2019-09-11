/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FavouriteSportsSelectorContext
// ====================================================

export type FavouriteSportsSelectorContext_groups_favouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,
};

export type FavouriteSportsSelectorContext_groups = {
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
  /**
   * Whether to allow a custom selection of subgroups to be shown as sub-nav items
   * instead of just popular ones
   */
  canSelectSubgroups: boolean,
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * Popular defines whether we consider the EventGroup to be popular
   */
  popular: boolean,
  /**
   * The icon for the sport group
   */
  icon: ?string,
  /**
   * The active indicator for the sport group, used on the nav
   */
  activeIndicator: ?string,
  /**
   * The favourited competitions for this EventGroup
   */
  favouriteCompetitions: Array<FavouriteSportsSelectorContext_groups_favouriteCompetitions>,
};

export type FavouriteSportsSelectorContext = {
  /**
   * Get list of available event groups from the root level
   */
  groups: Array<FavouriteSportsSelectorContext_groups>
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