import { combineReducers } from "redux";
import {
  types,
  APP_HANDSHAKE_KEY,
  GAMES_HANDSHAKE_KEY,
} from "./handshake.constants";

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
