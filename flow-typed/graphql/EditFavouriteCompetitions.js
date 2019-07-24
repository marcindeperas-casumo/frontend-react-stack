/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: EditFavouriteCompetitions
// ====================================================

export type EditFavouriteCompetitions_favouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number
};

export type EditFavouriteCompetitions = {
  favouriteCompetitions: Array<EditFavouriteCompetitions_favouriteCompetitions>
};

export type EditFavouriteCompetitionsVariables = {
  groupId: number
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