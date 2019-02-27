// @flow
import { types as fetchTypes } from "Models/fetch";
import { types } from "./liveCasino.constants";
import { getAllLiveCasinoGames, getLiveCasinoTable } from "Api/api.gamebrowser";

export const initFetchAllLiveGames = () => ({
  type: types.FETCH_ALL_LIVE_GAMES_INIT,
});

export const fetchAllLiveGames = (asyncCallData: {
  country: string,
  platform?: string,
  variant?: string,
}) => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_ALL_LIVE_GAMES_START,
  asyncCallData,
  asyncCall: getAllLiveCasinoGames,
  postFetch: types.FETCH_ALL_LIVE_GAMES_COMPLETE,
});

export const fetchMissingLiveTables = (asyncCallData: {
  ids: Array<string>,
  currency: string,
}) => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_TABLES_DATA_START,
  asyncCallData,
  asyncCall: getLiveCasinoTable,
  postFetch: types.FETCH_TABLES_DATA_COMPLETE,
});
