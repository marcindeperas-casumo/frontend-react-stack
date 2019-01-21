import { types } from "./gameSearch.constants";
import { types as fetchTypes } from "Models/fetch";
import { getCasinoGames } from "Api/api.casinoGames";
import { getGameSearch } from "Api/api.gamebrowser";

export const fetchAllGames = () => ({
  type: types.GAME_SEARCH_FETCH_ALL_GAMES,
});

export const fetchGameListAllGames = () => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_ALL_GAMES_START,
  postFetch: types.GAME_SEARCH_FETCH_ALL_GAMES_COMPLETE,
  asyncCall: getCasinoGames,
});

export const fetchSearch = q => ({
  type: types.GAME_SEARCH_FETCH,
  q,
});

export const fetchGameSearch = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_START,
  postFetch: types.GAME_SEARCH_FETCH_COMPLETE,
  asyncCall: getGameSearch,
  asyncCallData,
});
