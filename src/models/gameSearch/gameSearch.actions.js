import { types, getSearchFetchCompleteTypeByPage } from "Models/gameSearch";
import { types as fetchTypes } from "Models/fetch";
import {
  getGameLists,
  getLatestPlayedGames,
  getGamesByProviderGameNames,
} from "Api/api.gamebrowser";
import {
  getCasinoPlayerGameSearch,
  getCasinoPlayerGameSearchCount,
} from "Api/api.casinoPlayerGames";
import { fetchSuggestedGames } from "Api/api.games";

export const initFetchGameSearchCount = query => ({
  type: types.GAME_SEARCH_FETCH_COUNT,
  query,
});

export const initFetchGameSearchPage = ({ startIndex, pageSize, query }) => ({
  type: types.GAME_SEARCH_FETCH_PAGE,
  startIndex,
  pageSize,
  query,
});

export const clearSearch = () => ({ type: types.GAME_SEARCH_CLEAR });

export const initFetchSuggested = game => ({
  type: types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_START,
  game,
});

export const fetchGameSearch = ({ page, pageSize, sessionId, query }) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_START,
  postFetch: getSearchFetchCompleteTypeByPage(query, page),
  asyncCall: getCasinoPlayerGameSearch,
  asyncCallData: { page, pageSize, sessionId, query },
});

export const fetchGameSearchCount = ({ sessionId, query }) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_COUNT_START,
  postFetch: types.GAME_SEARCH_FETCH_COUNT_COMPLETE,
  asyncCall: getCasinoPlayerGameSearchCount,
  asyncCallData: { sessionId, query },
});

export const fetchLatestPlayedGames = ({ playerId }) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_LATEST_PLAYED_START,
  postFetch: types.GAME_SEARCH_FETCH_LATEST_PLAYED_COMPLETE,
  asyncCall: getLatestPlayedGames,
  asyncCallData: { playerId },
});

export const fetchGamesByProviderGameNames = ({
  platform,
  country,
  variant,
  providerGameNames,
}) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_GAMES_PROVIDER_START,
  postFetch: types.GAME_SEARCH_FETCH_GAMES_PROVIDER_COMPLETE,
  asyncCall: getGamesByProviderGameNames,
  asyncCallData: { platform, country, variant, providerGameNames },
});

export const fetchMostPopularGames = ({
  platform,
  country,
  id,
  variant = "default",
  page = 0,
  pageSize = 5,
}) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_MOSTPOPULAR_START,
  postFetch: types.GAME_SEARCH_FETCH_MOSTPOPULAR_COMPLETE,
  asyncCall: getGameLists,
  asyncCallData: { platform, country, id, variant, page, pageSize },
});

export const fetchSuggestedGamesAction = (
  game,
  handshake,
  platform,
  country,
  variant
) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_START,
  postFetch: types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_COMPLETE,
  asyncCall: fetchSuggestedGames,
  asyncCallData: {
    game,
    handshake,
    platform,
    country,
    variant,
  },
});
