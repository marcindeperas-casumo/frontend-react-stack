import { createSelector } from "reselect";
import { compose, defaultTo, prop, not, isEmpty } from "ramda";
import { gameListSelector, gameEntitiesSelector } from "Models/schema";

export const gameSearchSelector = createSelector(
  gameEntitiesSelector,
  defaultTo([])
);

export const isGameSearchLoadedFactory = createSelector(
  gameListSelector("allGames"),
  compose(
    not,
    isEmpty,
    prop("games")
  )
);
