import { types } from "Models/gameSearch";
import { types as fetchTypes } from "Models/fetch";
import {
  getGameLists,
  getQuerySearch,
  getLatestPlayedGames,
  getGamesByProviderGameNames,
} from "Api/api.gamebrowser";

export const initFetchQuerySearch = query => ({
  type: types.GAME_SEARCH_FETCH,
  query,
});

export const clearSearch = () => ({ type: types.GAME_SEARCH_CLEAR });

export const noResultsAction = () => ({ type: types.GAME_SEARCH_NO_RESULTS });

export const noLatestPlayedAction = () => ({
  type: types.GAME_SEARCH_NO_LATEST_PLAYED,
});

export const fetchQuerySearch = ({ platform, country, query }) => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_START,
  postFetch: types.GAME_SEARCH_FETCH_COMPLETE,
  asyncCall: getQuerySearch,
  asyncCallData: { platform, country, query },
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
