import { mergeDeepRight } from "ramda";
import { combineReducers } from "redux";
import { types, ENTITY_KEYS } from "./schema.constants";

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
    case types.MERGE_ENTITY: {
      if (!action.payload[entityKey]) {
        return state;
      }
      return mergeDeepRight(state, action.payload[entityKey]);
    }
    default:
      return state;
  }
};

export const reducer = combineReducers({
  [ENTITY_KEYS.GAME]: entityReducerFactory(ENTITY_KEYS.GAME),
  [ENTITY_KEYS.LIVE_TABLE]: entityReducerFactory(ENTITY_KEYS.LIVE_TABLE),
  [ENTITY_KEYS.GAME_LIST]: entityReducerFactory(ENTITY_KEYS.GAME_LIST),
  [ENTITY_KEYS.CMS]: entityReducerFactory(ENTITY_KEYS.CMS),
  [ENTITY_KEYS.JACKPOT]: entityReducerFactory(ENTITY_KEYS.JACKPOT),
  [ENTITY_KEYS.JACKPOT_MUST_DROP]: entityReducerFactory(
    ENTITY_KEYS.JACKPOT_MUST_DROP
  ),
});

export default reducer;
