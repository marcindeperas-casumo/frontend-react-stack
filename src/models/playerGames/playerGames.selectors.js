import { createSelector } from "reselect";
import {
  compose,
  prop,
  not,
  isEmpty,
  pickBy,
  pluck,
  sort,
  map,
  values,
  flatten,
} from "ramda";
import { gameListSelector, gameListEntitiesSelector } from "Models/schema";
import { getPlayerGamesListIdByPage } from "Models/playerGames";
import { GAME_LIST_IDS } from "Src/constants";

const isPlayerGames = (val, key) => key.startsWith(GAME_LIST_IDS.PLAYER_GAMES);

const playerGames = state => state.playerGames;

export const playerGamesCountSelector = createSelector(
  playerGames,
  prop("count")
);

export const playerGamesSelector = createSelector(
  gameListEntitiesSelector,
  compose(
    sort((a, b) => a.localeCompare(b)),
    flatten,
    values,
    pluck("games"),
    pickBy(isPlayerGames)
  )
);

export const isPlayerGamesPageLoaded = page =>
  createSelector(
    gameListSelector(getPlayerGamesListIdByPage(page)),
    compose(
      not,
      isEmpty,
      prop("games")
    )
  );

export const playerGamesPagesLoaded = createSelector(
  gameListEntitiesSelector,
  compose(
    values,
    map(o => Number(o.replace(`${GAME_LIST_IDS.PLAYER_GAMES}Page`, ""))),
    pluck("id"),
    pickBy(isPlayerGames)
  )
);
