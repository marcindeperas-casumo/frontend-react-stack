

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: FavouriteCompetitionsSelectorQuery
// ====================================================

export type FavouriteCompetitionsSelectorQuery_group_groups_groups = {
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
  /**
   * Popular defines whether we consider the EventGroup to be popular
   */
  popular: boolean,
};

export type FavouriteCompetitionsSelectorQuery_group_groups = {
  /**
   * Unique identifier of the event group
   */
  id: number,
  /**
   * Popular defines whether we consider the EventGroup to be popular
   */
  popular: boolean,
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * Array of subgroups in this event group
   */
  groups: ?Array<FavouriteCompetitionsSelectorQuery_group_groups_groups>,
};

export type FavouriteCompetitionsSelectorQuery_group = {
  /**
   * Name of the event group, localized according to the lang parameter
   */
  name: string,
  /**
   * Array of subgroups in this event group
   */
  groups: ?Array<FavouriteCompetitionsSelectorQuery_group_groups>,
};

export type FavouriteCompetitionsSelectorQuery = {
  /**
   * Get list of sub-groups from a given group
   */
  group: FavouriteCompetitionsSelectorQuery_group
};

export type FavouriteCompetitionsSelectorQueryVariables = {
  groupId: number
};

/* @flow */
/* eslint-disable */
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================