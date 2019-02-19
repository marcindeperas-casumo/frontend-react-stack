

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: SearchQuery
// ====================================================

export type SearchQuery_search = {
  /**
   * The type of search result, N.B Not overly reliable
   */
  type: SearchResultType,
  /**
   * ListView resource context (route key) for displaying search item (e.g. /football/all/all/liverpool)
   */
  id: string,
  /**
   * Translated name of the search result
   */
  localizedName: string,
};

export type SearchQuery = {
  /**
   * Search for events matching a given query, non english lang will search english results too
   */
  search: Array<SearchQuery_search>
};

export type SearchQueryVariables = {
  query: string
};

/* @flow */
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
export type Modal = "CHOOSE_FAVOURITES" | "CHOOSE_FAVOURITE_COMPETITIONS" | "SEARCH";

//==============================================================
// END Enums and Input Objects
//==============================================================