import { combineReducers } from "redux";
import {
  JACKPOT_ENTITY_KEY,
  LIVE_TABLE_ENTITY_KEY,
  GAME_ENTITY_KEY,
  GAME_LIST_ENTITY_KEY,
} from "Reducers/schema/schema";

export const types = {
  ADD_ENTITIES: "ENTITIES/ADD_ENTITIES",
};

export const addEntities = payload => ({ type: types.ADD_ENTITIES, payload });

const updateEntitiesReducerFactory = key => (state = {}, action) => {
  switch (action.type) {
    case types.ADD_ENTITIES:
      return {
        ...state,
        ...action.payload[key],
      };
    default:
      return state;
  }
};
const games = updateEntitiesReducerFactory("games");
const lists = updateEntitiesReducerFactory("lists");
const liveCasino = updateEntitiesReducerFactory("liveCasino");
const jackpot = updateEntitiesReducerFactory("jackpot");

export default combineReducers({
  [`${GAME_ENTITY_KEY}s`]: games,
  [`${GAME_LIST_ENTITY_KEY}s`]: lists,
  [LIVE_TABLE_ENTITY_KEY]: liveCasino,
  [JACKPOT_ENTITY_KEY]: jackpot,
});
