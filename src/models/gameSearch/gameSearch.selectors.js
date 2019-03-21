import { createSelector } from "reselect";
import { prop, propOr } from "ramda";
import { gameListSelector } from "Models/schema";
import { getField } from "Models/cms";
import { cmsPageSlug } from "Models/gameSearch";
import { GAME_LIST_IDS, EVENT_LOCATIONS } from "Src/constants";

export const gameSearch = state => state.gameSearch;

export const isLoadingSelector = createSelector(
  gameSearch,
  prop("loading")
);

export const gameSearchResults = createSelector(
  gameListSelector(GAME_LIST_IDS.GAME_SEARCH),
  propOr([], "games")
);

export const suggestedGames = createSelector(
  gameListSelector(GAME_LIST_IDS.SUGGESTED_GAMES),
  propOr([], "games")
);

export const gameSearchQuerySelector = createSelector(
  gameSearch,
  prop("query")
);

export const gameSearchSuggestedList = createSelector(
  getField({
    slug: cmsPageSlug,
    field: "continue_playing",
    defaultValue: "Continue Playing",
  }),
  getField({
    slug: cmsPageSlug,
    field: "popular_games",
    defaultValue: "Popular Games",
  }),
  getField({
    slug: cmsPageSlug,
    field: "similar_games",
    defaultValue: "You might also like",
  }),
  gameListSelector(GAME_LIST_IDS.LATEST_PLAYED),
  gameListSelector(GAME_LIST_IDS.POPULAR_GAMES),
  gameListSelector(GAME_LIST_IDS.SUGGESTED_GAMES),
  gameSearchResults,
  (
    titlePlaying,
    titlePopular,
    titleSuggested,
    latest,
    popular,
    suggested,
    searchResults
  ) => {
    if (searchResults && searchResults.length === 1) {
      return {
        ...suggested,
        title: titleSuggested,
        location: EVENT_LOCATIONS.SUGGESTED_GAMES,
      };
    } else if (latest.games && latest.games.length) {
      return {
        ...latest,
        title: titlePlaying,
        location: EVENT_LOCATIONS.LATEST_PLAYED_GAMES,
      };
    } else {
      return {
        ...popular,
        title: titlePopular,
        location: EVENT_LOCATIONS.POPULAR_GAMES,
      };
    }
  }
);

export const searchNotFoundContent = createSelector(
  getField({
    slug: cmsPageSlug,
    field: "no_results_continue_playing",
    defaultValue:
      "Find another game or continue playing your last played games",
  }),
  getField({
    slug: cmsPageSlug,
    field: "no_results_popular",
    defaultValue: "Find another game or try something popular",
  }),
  gameListSelector(GAME_LIST_IDS.LATEST_PLAYED),
  (contentContinuePlaying, contentPopular, latest) =>
    latest.games && latest.games.length
      ? contentContinuePlaying
      : contentPopular
);
