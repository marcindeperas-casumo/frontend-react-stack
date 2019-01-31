import { createSelector } from "reselect";
import { compose, defaultTo, prop, not, isEmpty } from "ramda";
import { gameListSelector } from "Models/schema";
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

export const playerGamesSelector = createSelector(
  gameListSelector(listTypes.PLAYER_GAMES),
  compose(
    defaultTo([]),
    prop("games")
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
  compose(
    defaultTo([]),
    prop("games")
  )
);
