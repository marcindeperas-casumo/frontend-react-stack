import { types as fetchTypes } from "Models/fetch";
import { types } from "./gameProviders.constants";
import { getGameProviders } from "Api/api.casinoPlayerGames";

export const initiateFetchGameProviders = () => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_GAME_PROVIDERS,
  postFetch: types.FETCH_GAME_PROVIDERS_COMPLETE,
  asyncCall: getGameProviders,
});

export const fetchGameProviders = () => ({
  type: types.FETCH_GAME_PROVIDERS_START,
});

export const getGameProvider = provider => ({
  type: types.GET_GAME_PROVIDER,
  provider,
});

export const getGameProviderSuccess = provider => ({
  type: types.GET_GAME_PROVIDER_SUCCESS,
  provider,
});
