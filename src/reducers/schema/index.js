import { combineReducers } from "redux";
import {
  GAME_ENTITY_KEY,
  LIVE_TABLE_ENTITY_KEY,
  JACKPOT_ENTITY_KEY,
  GAME_LIST_ENTITY_KEY,
} from "./schema";

export const types = {
  UPDATE_ENTITY: "SCHEMA/UPDATE_ENTITY",
};

export const updateEntity = payload => ({ type: types.UPDATE_ENTITY, payload });

export const actions = {
  updateEntity,
};

const entityReducerFactory = entityKey => (state = {}, action) => {
  switch (action.type) {
    case types.UPDATE_ENTITY: {
      return {
        ...state,
        ...action.payload[entityKey],
      };
    }
    default:
      return state;
  }
};

export const reducer = combineReducers({
  [GAME_ENTITY_KEY]: entityReducerFactory(GAME_ENTITY_KEY),
  [LIVE_TABLE_ENTITY_KEY]: entityReducerFactory(LIVE_TABLE_ENTITY_KEY),
  [JACKPOT_ENTITY_KEY]: entityReducerFactory(JACKPOT_ENTITY_KEY),
  [GAME_LIST_ENTITY_KEY]: entityReducerFactory(GAME_LIST_ENTITY_KEY),
});

export default reducer;
