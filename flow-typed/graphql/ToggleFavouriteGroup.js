/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: ToggleFavouriteGroup
// ====================================================

export type ToggleFavouriteGroup_toggleFavouriteGroup = {
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
};

export type ToggleFavouriteGroup = {
  toggleFavouriteGroup: ToggleFavouriteGroup_toggleFavouriteGroup
};

export type ToggleFavouriteGroupVariables = {
  id: number
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