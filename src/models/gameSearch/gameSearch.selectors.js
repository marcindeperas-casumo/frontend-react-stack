import { createSelector } from "reselect";
import { compose, defaultTo, prop, not, isEmpty } from "ramda";
import { gameListSelector } from "Models/schema";

export const gameSearchSelector = createSelector(
  gameListSelector("allGames"),
  compose(
    defaultTo([]),
    prop("games")
  )
);

export const isGameSearchLoadedFactory = createSelector(
  gameListSelector("allGames"),
  compose(
    not,
    isEmpty,
    prop("games")
  )
);

export const gameSearchResultsSelector = createSelector(
  gameListSelector("gameSearchResults"),
  compose(
    defaultTo([]),
    prop("games")
  )
);
