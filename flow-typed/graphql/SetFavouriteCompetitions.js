

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SetFavouriteCompetitions
// ====================================================

export type SetFavouriteCompetitions_setFavouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * Whether this is one of the users, selected favourites
   */
  userFavourite: boolean,
};

export type SetFavouriteCompetitions = {
  setFavouriteCompetitions: Array<SetFavouriteCompetitions_setFavouriteCompetitions>
};

export type SetFavouriteCompetitionsVariables = {
  groupId: number,
  ids: Array<number>,
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