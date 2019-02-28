// @flow
import { types as fetchTypes } from "Models/fetch";
import { types } from "./liveCasino.constants";
import { getGameLists, getLiveCasinoTable } from "Api/api.gamebrowser";

export const initFetchAllLiveGames = () => ({
  type: types.FETCH_ALL_LIVE_GAMES_INIT,
});

export const fetchAllLiveGames = (data: {
  country: string,
  id?: string,
  platform?: string,
  variant?: string,
  page?: number,
  pageSize?: number,
}) => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_ALL_LIVE_GAMES_START,
  asyncCallData: {
    id: "liveCasinoGamesFull",
    page: 0,
    platform: "mobile",
    variant: "default",
    pageSize: Number.MAX_SAFE_INTEGER,
    ...data,
  },
  asyncCall: getGameLists,
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
