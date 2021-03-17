import { combineReducers } from "redux";
import { types, APP_HANDSHAKE_KEY } from "./handshake.constants";

const DEFAULT_STATE = {};

const handlers = {
  [types.UPDATE_HANDSHAKE]: (key, state, action) => ({
    ...state,
    ...action.response[key],
  }),
};

const handshakeReducerFactory = key => (state = DEFAULT_STATE, action) => {
  return handlers[action.type]
    ? handlers[action.type](key, state, action)
    : state;
};

export default combineReducers({
  app: handshakeReducerFactory(APP_HANDSHAKE_KEY),
});
