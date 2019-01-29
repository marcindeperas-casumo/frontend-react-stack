import { createSelector } from "reselect";
import { compose, defaultTo, prop, not, isEmpty } from "ramda";
import { gameListSelector } from "Models/schema";
import { listTypes } from "Models/gameSearch";

export const playerGamesAll = createSelector(
  gameListSelector(listTypes.PLAYER_GAMES_ID),
  compose(
    defaultTo([]),
    prop("games")
  )
);

export const isGameSearchLoading = createSelector(
  gameListSelector(listTypes.GAME_SEARCH_ID),
  prop("loading")
);

export const isGameSearchNoMatch = createSelector(
  gameListSelector(listTypes.GAME_SEARCH_ID),
  prop("noMatch")
);

export const hasNoLatestPlayed = createSelector(
  gameListSelector(listTypes.GAME_SEARCH_ID),
  prop("hasNoLatestPlayed")
);

export const isGameSearchLoaded = createSelector(
  gameListSelector(listTypes.GAME_SEARCH_ID),
  compose(
    not,
    isEmpty,
    prop("games")
  )
);

export const gameSearchResults = createSelector(
  gameListSelector(listTypes.GAME_SEARCH_ID),
  compose(
    defaultTo([]),
    prop("games")
  )
);
