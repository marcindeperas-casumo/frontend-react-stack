

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FavouriteCompetitionsSelectorRegion_Group
// ====================================================

export type FavouriteCompetitionsSelectorRegion_Group_groups = {
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
   * Emoji flag representing the country this event takes place in, if available
   */
  flagEmoji: ?string,
};

export type FavouriteCompetitionsSelectorRegion_Group = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * Array of subgroups in this event group
   */
  groups: ?Array<FavouriteCompetitionsSelectorRegion_Group_groups>,
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