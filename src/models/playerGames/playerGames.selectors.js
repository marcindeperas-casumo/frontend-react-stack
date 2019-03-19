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
  includes,
  append,
  head,
} from "ramda";
import { gameListSelector, gameListEntitiesSelector } from "Models/schema";
import { getPlayerGamesListIdByPage } from "Models/playerGames";
import { GAME_LIST_IDS } from "Src/constants";

const isPlayerGames = (val, key) => key.startsWith(GAME_LIST_IDS.PLAYER_GAMES);

const playerGames = state => state.playerGames;

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
    games => {
      /* eslint-disable fp/no-let, fp/no-mutation */
      let lettersMap = [];
      let list = [];
      map(game => {
        const letter = head(game).toLocaleUpperCase();
        const title = isNaN(letter) ? letter : "#0-9";
        if (!includes(title, lettersMap)) {
          lettersMap = append(title, lettersMap);
          list = append({ title }, list);
        }
        list = append({ game }, list);
      }, games);
      return list;
      /* eslint-enable fp/no-let, fp/no-mutation */
    },
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
