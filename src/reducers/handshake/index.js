import CommonClient from "Clients/CommonClient";
import GameBrowserClient from "Clients/GameBrowserClient";
import { types as fetchTypes } from "Reducers/fetch";
import { combineReducers } from "redux";
import { composePromises } from "Utils/utils";

export const APP_HANDSHAKE_KEY = "app";
export const GAMES_HANDSHAKE_KEY = "games";

export const types = {
  FETCH_APP_HANDSHAKE: "HANDSHAKE/FETCH_APP_HANDSHAKE",
  FETCH_GAMES_HANDSHAKE: "HANDSHAKE/FETCH_GAMES_HANDSHAKE",
  UPDATE_HANDSHAKE: "HANDSHAKE/UPDATE_HANDSHAKE",
};

export const fetchAppHandshake = () => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_APP_HANDSHAKE,
  asyncCall: composePromises(app => ({ app }), CommonClient.handshake),
  postFetch: types.UPDATE_HANDSHAKE,
});

export const fetchGamesHandshake = ({ country }) => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_GAMES_HANDSHAKE,
  asyncCallData: { country, platform: "mobile" },
  asyncCall: composePromises(games => ({ games }), GameBrowserClient.handshake),
  postFetch: types.UPDATE_HANDSHAKE,
});

export const updateHandshake = response => ({
  type: types.UPDATE_HANDSHAKE,
  response,
});

export const actions = {
  fetchAppHandshake,
  fetchGamesHandshake,
  updateHandshake,
};

const handshakeReducerFactory = key => (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_HANDSHAKE:
      return {
        ...state,
        ...action.response[key],
      };
    default:
      return state;
  }
};

export default combineReducers({
  app: handshakeReducerFactory(APP_HANDSHAKE_KEY),
  games: handshakeReducerFactory(GAMES_HANDSHAKE_KEY),
});
