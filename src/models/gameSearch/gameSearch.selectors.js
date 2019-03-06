import { createSelector } from "reselect";
import { prop, propOr } from "ramda";
import { gameListSelector } from "Models/schema";
import { getField } from "Models/cms";
import { cmsPageSlug } from "Models/gameSearch";
import { GAME_LIST_IDS } from "Src/constants";

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

export const gameSearchResults = createSelector(
  gameListSelector(GAME_LIST_IDS.GAME_SEARCH),
  propOr([], "games")
);

export const gameSearchQuerySelector = createSelector(
  gameSearch,
  prop("query")
);

export const gameSearchSuggestedList = createSelector(
  getField({ slug: cmsPageSlug, field: "continue_playing" }),
  getField({ slug: cmsPageSlug, field: "popular_games" }),
  gameListSelector(GAME_LIST_IDS.LATEST_PLAYED),
  gameListSelector(GAME_LIST_IDS.POPULAR_GAMES),
  (titlePlaying, titlePopular, latest, popular) =>
    latest.games && latest.games.length
      ? {
          ...latest,
          title: titlePlaying,
        }
      : {
          ...popular,
          title: titlePopular,
        }
);
