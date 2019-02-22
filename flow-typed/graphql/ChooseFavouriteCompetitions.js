

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: ChooseFavouriteCompetitions
// ====================================================

export type ChooseFavouriteCompetitions_favouriteCompetitions = {
  /**
   * Unique identifier of the event group
   */
  id: number
};

export type ChooseFavouriteCompetitions = {
  favouriteCompetitions: Array<ChooseFavouriteCompetitions_favouriteCompetitions>
};

export type ChooseFavouriteCompetitionsVariables = {
  groupId: number
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
export type Modal = "CHOOSE_FAVOURITES" | "CHOOSE_FAVOURITE_COMPETITIONS" | "SEARCH";

//==============================================================
// END Enums and Input Objects
//==============================================================