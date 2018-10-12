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

// This function definitions below (*HandshakeCall) are assigned to their own
// constant so that we can pass them by reference to the actionCreator.
// This will help in testing equality checks of actions creators.
const fetchAppHandshakeCall = composePromises(
  app => ({ app }),
  CommonClient.handshake
);

const fetchGamesHandshakeCall = composePromises(
  games => ({ games }),
  GameBrowserClient.handshake
);

export const fetchAppHandshake = () => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_APP_HANDSHAKE,
  asyncCall: fetchAppHandshakeCall,
  postFetch: types.UPDATE_HANDSHAKE,
});

export const fetchGamesHandshake = ({ country }) => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_GAMES_HANDSHAKE,
  asyncCallData: { country, platform: "mobile" },
  asyncCall: fetchGamesHandshakeCall,
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
