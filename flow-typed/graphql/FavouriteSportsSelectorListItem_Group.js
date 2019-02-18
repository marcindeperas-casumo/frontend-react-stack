

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL fragment: FavouriteSportsSelectorListItem_Group
// ====================================================

export type FavouriteSportsSelectorListItem_Group_favouriteCompetitions = {
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

export type FavouriteSportsSelectorListItem_Group = {
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * The sport of the event group
   */
  sport: string,
  /**
   * Whether to allow a custom selection of subgroups to be shown as sub-nav items, instead of just popular ones
   */
  canSelectSubgroups: boolean,
  /**
   * The icon for the sport group
   */
  icon: ?string,
  /**
   * The favourited competitions for this EventGroup
   */
  favouriteCompetitions: Array<FavouriteSportsSelectorListItem_Group_favouriteCompetitions>,
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