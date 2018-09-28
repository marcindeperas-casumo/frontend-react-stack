import { combineReducers } from "redux";
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
  games,
  lists,
  liveCasino,
  jackpot,
});
