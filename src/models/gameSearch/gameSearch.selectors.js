import { createSelector } from "reselect";
import {
  compose,
  prop,
  not,
  isEmpty,
  propOr,
  pickBy,
  pluck,
  values,
  flatten,
} from "ramda";
import { gameListSelector, gameListEntitiesSelector } from "Models/schema";
import { listTypes } from "Models/gameSearch";

export const gameSearch = state => state.gameSearch;

export const isLoadingSelector = createSelector(
  gameSearch,
  prop("loading")
);

export const hasNoResultsSelector = createSelector(
  gameSearch,
  prop("hasNoResults")
);

export const hasNoLatestPlayedSelector = createSelector(
  gameSearch,
  prop("hasNoLatestPlayed")
);

const isPlayerGames = (val, key) => key.startsWith(listTypes.PLAYER_GAMES);

export const playerGamesSelector = createSelector(
  gameListEntitiesSelector,
  compose(
    flatten,
    values,
    pluck("games"),
    pickBy(isPlayerGames)
  )
);

export const isPlayerGamesLoaded = createSelector(
  gameListSelector(listTypes.PLAYER_GAMES),
  compose(
    not,
    isEmpty,
    prop("games")
  )
);

export const gameSearchResults = createSelector(
  gameListSelector(listTypes.GAME_SEARCH),
  propOr([], "games")
);

export const gameSearchQuerySelector = createSelector(
  gameSearch,
  prop("query")
);
