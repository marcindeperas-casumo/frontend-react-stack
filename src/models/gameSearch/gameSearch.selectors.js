import { createSelector } from "reselect";
import { compose, defaultTo, prop, not, isEmpty } from "ramda";
import { gameListSelector } from "Models/schema";
import { PLAYER_ALL_GAMES_LIST_ID } from "Models/gameSearch";

export const playerGamesAllSelector = createSelector(
  gameListSelector(PLAYER_ALL_GAMES_LIST_ID),
  compose(
    defaultTo([]),
    prop("games")
  )
);

export const isGameSearchLoading = createSelector(
  gameListSelector("gameSearch"),
  prop("loading")
);

export const isGameSearchNoMatch = createSelector(
  gameListSelector("gameSearch"),
  prop("noMatch")
);

export const isGameSearchLoadedFactory = createSelector(
  gameListSelector(PLAYER_ALL_GAMES_LIST_ID),
  compose(
    not,
    isEmpty,
    prop("games")
  )
);

export const gameSearchResultsSelector = createSelector(
  gameListSelector("gameSearch"),
  compose(
    defaultTo([]),
    prop("games")
  )
);

export const gameSearchQuerySelector = createSelector(
  gameListSelector("gameSearch"),
  compose(
    defaultTo(""),
    prop("query")
  )
);
