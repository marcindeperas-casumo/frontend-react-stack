import { createSelector } from "reselect";

import {
  compose,
  prop,
  not,
  isEmpty,
  pickBy,
  pluck,
  values,
  flatten,
} from "ramda";
import { gameListSelector, gameListEntitiesSelector } from "Models/schema";
import { GAME_LIST_IDS } from "Src/constants";

const isPlayerGames = (val, key) => key.startsWith(GAME_LIST_IDS.PLAYER_GAMES);

export const playerGamesSelector = createSelector(
  gameListEntitiesSelector,
  compose(
    flatten,
    values,
    pluck("games"),
    pickBy(isPlayerGames)
  )
);

export const isPlayerGamesPageLoaded = page =>
  createSelector(
    gameListSelector(GAME_LIST_IDS.PLAYER_GAMES),
    compose(
      not,
      isEmpty,
      prop("games")
    )
  );
