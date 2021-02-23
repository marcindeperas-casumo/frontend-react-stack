import { mergeDeepRight, path } from "ramda";
import { combineReducers } from "redux";
import { types, ENTITY_KEYS } from "./schema.constants";

const DEFAULT_STATE = {};

const handlers = {
  [types.UPDATE_ENTITY]: (entityKey, state, action) => ({
    ...state,
    ...action.payload[entityKey],
  }),
  [types.MERGE_ENTITY]: (entityKey, state, action) =>
    mergeDeepRight(state, action.payload[entityKey]),
};

const entityReducerFactory = entityKey => (state = DEFAULT_STATE, action) => {
  // If the entityKey is not present in the action payload we can bail out
  // early and return the previous state. This will ensure that identity
  // comparison for the downstream selectors will return true since the
  // state remained the same.
  const doesEntityExist = Boolean(path(["payload", entityKey], action));

  return handlers[action.type] && doesEntityExist
    ? handlers[action.type](entityKey, state, action)
    : state;
};

const schemaReducer = combineReducers({
  [ENTITY_KEYS.CMS]: entityReducerFactory(ENTITY_KEYS.CMS),
  [ENTITY_KEYS.ADVENTURER]: entityReducerFactory(ENTITY_KEYS.ADVENTURER),
  [ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW]: entityReducerFactory(
    ENTITY_KEYS.TRANSACTIONS_ANNUAL_OVERVIEW
  ),
  [ENTITY_KEYS.ACKNOWLEDGEMENTS]: entityReducerFactory(
    ENTITY_KEYS.ACKNOWLEDGEMENTS
  ),
});

export default schemaReducer;
