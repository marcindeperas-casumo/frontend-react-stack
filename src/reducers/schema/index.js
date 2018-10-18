import { combineReducers } from "redux";
import {
  GAME_ENTITY_KEY,
  LIVE_TABLE_ENTITY_KEY,
  JACKPOT_ENTITY_KEY,
  GAME_LIST_ENTITY_KEY,
  CURATED_ENTITY_KEY,
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
      // If the entityKey is not present in the action payload we can bail out
      // early and return the previous state. This will ensure that identity
      // comparison for the downstream selectors will return true since the
      // state remained the same.
      if (!action.payload[entityKey]) {
        return state;
      }

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
  [CURATED_ENTITY_KEY]: entityReducerFactory(CURATED_ENTITY_KEY),
});

export default reducer;
