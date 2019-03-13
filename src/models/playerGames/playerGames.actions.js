import { types, getFetchCompleteTypeByPage } from "Models/playerGames";
import { types as fetchTypes } from "Models/fetch";
import {
  getCasinoPlayerGames,
  getCasinoPlayerGamesCount,
} from "Api/api.casinoPlayerGames";

export const preloadFetchPlayerGames = ({ startIndex, pageSize }) => ({
  type: types.PLAYER_GAMES_FETCH,
  startIndex,
  pageSize,
});

export const fetchPlayerGames = ({ page, pageSize, sessionId }) => ({
  type: fetchTypes.FETCH,
  name: types.PLAYER_GAMES_FETCH_START,
  postFetch: getFetchCompleteTypeByPage(page),
  asyncCall: getCasinoPlayerGames,
  asyncCallData: { page, pageSize, sessionId },
});

export const preloadFetchPlayerGamesCount = () => ({
  type: types.PLAYER_GAMES_FETCH_COUNT,
});

export const fetchPlayerGamesCount = () => ({
  type: fetchTypes.FETCH,
  name: types.PLAYER_GAMES_FETCH_COUNT_START,
  postFetch: types.PLAYER_GAMES_FETCH_COUNT_COMPLETE,
  asyncCall: getCasinoPlayerGamesCount,
});
