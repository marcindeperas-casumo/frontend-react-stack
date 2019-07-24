/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: TopSearches
// ====================================================

export type TopSearches_topSearches_parentGroups = {
  /**
   * The icon for the sport group
   */
  icon: ?string,
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
};

export type TopSearches_topSearches = {
  /**
   * Normalized name of the group
   */
  termKey: string,
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * The full path in the kambi client to navigate to this group
   */
  clientPath: string,
  /**
   * The icon for the sport group
   */
  icon: ?string,
  /**
   * Array of parents of this group in order, be careful with nesting!
   */
  parentGroups: Array<TopSearches_topSearches_parentGroups>,
};

export type TopSearches = {
  /**
   * Top searches returns the event groups for the groupIds marked as popular
   */
  topSearches: Array<TopSearches_topSearches>
};

export type TopSearchesVariables = {
  count: number
};/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

/**
 * 
 */
export type SearchResultType = "LEAGUE" | "PARTICIPANT" | "REGION" | "SPORT";

/**
 * 
 */
export type Modal = "BETTING_GLOSSARY" | "CHOOSE_FAVOURITES" | "CHOOSE_FAVOURITE_COMPETITIONS" | "SEARCH";

//==============================================================
// END Enums and Input Objects
//==============================================================