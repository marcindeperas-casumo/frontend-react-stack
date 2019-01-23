import { types } from "./gameSearch.constants";
import { types as fetchTypes } from "Models/fetch";
import { getCasinoPlayerGames } from "Api/api.casinoPlayerGames";
import {
  getQuerySearch,
  getLatestPlayedGames,
  getGamesByProviderGameNames,
} from "Api/api.gamebrowser";

export const initFetchPlayerGames = () => ({
  type: types.GAME_SEARCH_FETCH_PLAYER_GAMES,
});

export const fetchPlayerGames = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_PLAYER_GAMES_START,
  postFetch: types.GAME_SEARCH_FETCH_PLAYER_GAMES_COMPLETE,
  asyncCall: getCasinoPlayerGames,
  asyncCallData,
});

export const initFetchQuerySearch = q => ({
  type: types.GAME_SEARCH_FETCH,
  q,
});

export const fetchQuerySearch = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_START,
  postFetch: types.GAME_SEARCH_FETCH_COMPLETE,
  asyncCall: getQuerySearch,
  asyncCallData,
});

export const fetchLatestPlayedGames = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_LATEST_PLAYED_START,
  postFetch: types.GAME_SEARCH_FETCH_LATEST_PLAYED_COMPLETE,
  asyncCall: getLatestPlayedGames,
  asyncCallData,
});

export const fetchGamesByProviderGameNames = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_GAMES_PROVIDER_START,
  postFetch: types.GAME_SEARCH_FETCH_GAMES_PROVIDER_COMPLETE,
  asyncCall: getGamesByProviderGameNames,
  asyncCallData,
});
