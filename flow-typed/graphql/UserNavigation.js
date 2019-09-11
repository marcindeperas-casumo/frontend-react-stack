/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: UserNavigation
// ====================================================

export type UserNavigation_sportsNavigation_sport = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * The full path in the kambi client to navigate to this group
   */
  clientPath: string,
  /**
   * The full path in the kambi client to navigate to the in-play bets for this group
   */
  clientPathLive: string,
  /**
   * Normalized name of the group
   */
  termKey: string,
  /**
   * The icon for the sport group
   */
  icon: ?string,
  /**
   * The active indicator for the sport group, used on the nav
   */
  activeIndicator: ?string,
  /**
   * Whether to allow a custom selection of subgroups to be shown as sub-nav items
   * instead of just popular ones
   */
  canSelectSubgroups: boolean,
};

export type UserNavigation_sportsNavigation_subNav_competition = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * The full path in the kambi client to navigate to this group
   */
  clientPath: string,
  /**
   * The full path in the kambi client to navigate to the in-play bets for this group
   */
  clientPathLive: string,
  /**
   * Normalized name of the group
   */
  termKey: string,
  /**
   * The region code for the group, iso3166 code for most with some custom regions
   */
  regionCode: ?string,
};

export type UserNavigation_sportsNavigation_subNav = {
  competition: UserNavigation_sportsNavigation_subNav_competition
};

export type UserNavigation_sportsNavigation = {
  sport: UserNavigation_sportsNavigation_sport,
  subNav: Array<UserNavigation_sportsNavigation_subNav>,
};

export type UserNavigation = {
  allLabel: string,
  editLabel: string,
  liveLabel: string,
  sportsNavigation: Array<UserNavigation_sportsNavigation>,
};

export type UserNavigationVariables = {
  live: boolean
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