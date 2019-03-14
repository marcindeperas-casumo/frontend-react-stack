import { combineReducers } from "redux";
import {
  types,
  APP_HANDSHAKE_KEY,
  GAMES_HANDSHAKE_KEY,
} from "./handshake.constants";

const reducers = {
  [types.UPDATE_HANDSHAKE]: (key, state, action) => ({
    ...state,
    ...action.response[key],
  }),
};

const handshakeReducerFactory = key => (state = {}, action) => {
  return reducers[action.type]
    ? reducers[action.type](key, state, action)
    : state;
};

export default combineReducers({
  app: handshakeReducerFactory(APP_HANDSHAKE_KEY),
  games: handshakeReducerFactory(GAMES_HANDSHAKE_KEY),
});
