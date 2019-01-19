import { types } from "./gameSearch.constants";
import { types as fetchTypes } from "Models/fetch";
import { getCasinoGames } from "Api/api.casinoGames";

export const fetchAllGames = () => ({
  type: types.GAME_SEARCH_FETCH_ALL_GAMES,
});

export const fetchGameListAllGames = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.GAME_SEARCH_FETCH_ALL_GAMES_START,
  postFetch: types.GAME_SEARCH_FETCH_ALL_GAMES_COMPLETE,
  asyncCall: getCasinoGames,
  // asyncCallData,
});
