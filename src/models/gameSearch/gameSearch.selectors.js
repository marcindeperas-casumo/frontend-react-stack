import { createSelector } from "reselect";
import * as R from "ramda";
import { gameListSelector, gameListEntitiesSelector } from "Models/schema";
import { getField } from "Models/cms";
import { cmsPageSlug, getgameSearchListIdByPage } from "Models/gameSearch";
import { GAME_LIST_IDS, EVENT_LOCATIONS } from "Src/constants";

export const gameSearch = state => state.gameSearch;
const isGameSearchList = (val, key) =>
  key.startsWith(GAME_LIST_IDS.GAME_SEARCH);

export const isLoadingSelector = createSelector(
  gameSearch,
  R.prop("loading")
);

export const isSuggestedLoadingSelector = createSelector(
  gameSearch,
  R.prop("loadingSuggested")
);

export const gameForSuggestionsSelector = createSelector(
  gameSearch,
  R.prop("gameSuggested")
);

export const gameSearchResults = createSelector(
  gameListEntitiesSelector,
  R.compose(
    R.flatten,
    R.values,
    R.pluck("games"),
    R.pickBy(isGameSearchList)
  )
);

export const gameSearchResultsPagesLoaded = createSelector(
  gameListEntitiesSelector,
  R.compose(
    R.values,
    R.map(o => Number(o.replace(`${GAME_LIST_IDS.GAME_SEARCH}Page`, ""))),
    R.pluck("id"),
    R.pickBy(isGameSearchList)
  )
);

export const gameSearchResultsCountSelector = createSelector(
  gameSearch,
  R.prop("count")
);

export const suggestedGames = createSelector(
  gameListSelector(GAME_LIST_IDS.SUGGESTED_GAMES_SEARCH),
  R.propOr([], "games")
);

export const gameSearchQuerySelector = createSelector(
  gameSearch,
  R.prop("query")
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
  suggestedGames,
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
    if (searchResults && searchResults.length === 1 && suggested.length) {
      return {
        games: suggested,
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

export const isGameSearchPageLoaded = page =>
  createSelector(
    gameListSelector(getgameSearchListIdByPage(page)),
    R.propSatisfies(R.complement(R.isEmpty), "games")
  );
