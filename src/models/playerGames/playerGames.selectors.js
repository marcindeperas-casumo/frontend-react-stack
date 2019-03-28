import { createSelector } from "reselect";
import * as R from "ramda";
import { gameListSelector, gameListEntitiesSelector } from "Models/schema";
import { getPlayerGamesListIdByPage } from "Models/playerGames";
import { GAME_LIST_IDS } from "Src/constants";

const isPlayerGames = (val, key) => key.startsWith(GAME_LIST_IDS.PLAYER_GAMES);

const playerGames = state => state.playerGames;

export const playerGamesCountSelector = createSelector(
  playerGames,
  R.prop("count")
);

const alphabeticOrderWithTitles = R.reduce(
  (acc, game) => {
    const letter = R.head(game).toLocaleUpperCase();
    const sectionTitle = isNaN(letter) ? letter : "#0-9";

    if (!R.includes(sectionTitle, acc.lettersMap)) {
      return R.evolve({
        lettersMap: R.append(sectionTitle),
        list: R.compose(
          R.append({ game }),
          R.append({ sectionTitle })
        ),
      })(acc);
    }

    return R.evolve({
      list: R.append({ game }),
    })(acc);
  },
  { list: [], lettersMap: [] }
);

const getPlayerGamesAlphabeticOrderWithTitles = R.compose(
  alphabeticOrderWithTitles,
  R.sort((a, b) => a && a.localeCompare(b)),
  R.flatten,
  R.values,
  R.pluck("games"),
  R.pickBy(isPlayerGames)
);

export const playerGamesLetterTitlesCountSelector = createSelector(
  gameListEntitiesSelector,
  playerGamesCountSelector,
  (games, count) => {
    const map = R.compose(
      R.prop("lettersMap"),
      getPlayerGamesAlphabeticOrderWithTitles
    )(games);

    return map.length + count;
  }
);

export const playerGamesLetterTitlesSelector = createSelector(
  gameListEntitiesSelector,
  R.compose(
    R.prop("list"),
    getPlayerGamesAlphabeticOrderWithTitles
  )
);

export const isPlayerGamesPageLoaded = page =>
  createSelector(
    gameListSelector(getPlayerGamesListIdByPage(page)),
    R.compose(
      R.not,
      R.isEmpty,
      R.prop("games")
    )
  );

export const playerGamesPagesLoaded = createSelector(
  gameListEntitiesSelector,
  R.compose(
    R.values,
    R.map(o => Number(o.replace(`${GAME_LIST_IDS.PLAYER_GAMES}Page`, ""))),
    R.pluck("id"),
    R.pickBy(isPlayerGames)
  )
);
