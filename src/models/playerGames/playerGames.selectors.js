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

export const playerGamesLetterTitlesCountSelector = createSelector(
  playerGamesCountSelector,
  count => count + 26 // 26 alphabet letters
);

export const playerGamesLetterTitlesSelector = createSelector(
  gameListEntitiesSelector,
  R.compose(
    R.prop("list"),
    R.reduce(
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
    ),
    R.sort((a, b) => a && a.localeCompare(b)),
    R.flatten,
    R.values,
    R.pluck("games"),
    R.pickBy(isPlayerGames)
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
