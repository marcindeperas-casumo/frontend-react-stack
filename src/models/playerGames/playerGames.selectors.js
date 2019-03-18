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
  addIndex,
  includes,
  append,
} from "ramda";
import { gameListSelector, gameListEntitiesSelector } from "Models/schema";
import { getPlayerGamesListIdByPage } from "Models/playerGames";
import { GAME_LIST_IDS } from "Src/constants";

const isPlayerGames = (val, key) => key.startsWith(GAME_LIST_IDS.PLAYER_GAMES);

const playerGames = state => state.playerGames;

const mapIndexed = addIndex(map);

const getAlphabeticallyTitledGameList = o => {
  let lettersMap = []; // eslint-disable-line fp/no-let
  let list = []; // eslint-disable-line fp/no-let
  mapIndexed((game, i) => {
    const letter = game[0].toLocaleUpperCase();
    const title = isNaN(letter) ? letter : "#0-9";
    if (!includes(title, lettersMap)) {
      lettersMap = append(title, lettersMap); // eslint-disable-line fp/no-mutation
      list = append({ title }, list); // eslint-disable-line fp/no-mutation
    }
    list = append({ game }, list); // eslint-disable-line fp/no-mutation
  }, o);
  return list;
};

export const playerGamesCountSelector = createSelector(
  playerGames,
  compose(
    count => (count ? count + 27 : 0), // 26 alphabet letters + #0-9 title
    prop("count")
  )
);

export const playerGamesSelector = createSelector(
  gameListEntitiesSelector,
  compose(
    getAlphabeticallyTitledGameList,
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
