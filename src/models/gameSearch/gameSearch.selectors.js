import { createSelector } from "reselect";
import { compose, prop, not, isEmpty, propOr } from "ramda";
import { gameListSelector } from "Models/schema";
import { listTypes } from "Models/gameSearch";

export const gameSearch = state => state.gameSearch;

export const isLoadingSelector = createSelector(
  gameSearch,
  prop("loading")
);

export const startIndexSelector = createSelector(
  gameSearch,
  prop("startIndex")
);

export const hasNoResultsSelector = createSelector(
  gameSearch,
  prop("hasNoResults")
);

export const hasNoLatestPlayedSelector = createSelector(
  gameSearch,
  prop("hasNoLatestPlayed")
);

export const playerGamesSelector = createSelector(
  gameListSelector(listTypes.PLAYER_GAMES),
  propOr([], "games")
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
