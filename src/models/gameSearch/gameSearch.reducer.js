/* eslint-disable-next-line filenames/match-exported */
import { types } from "./gameSearch.constants";

const defaultState = { query: "" };

const reducers = {
  [types.GAME_SEARCH_FETCH_COMPLETE]: state => ({
    ...state,
    loading: false,
  }),
  [types.GAME_SEARCH_FETCH]: (state, action) => ({
    ...state,
    query: action.query,
    loading: true,
  }),
  [types.GAME_SEARCH_CLEAR]: state => ({
    ...state,
    query: "",
    loading: false,
  }),
};

export const gameSearchReducer = (state = defaultState, action) => {
  const type = action.type.startsWith(types.GAME_SEARCH_FETCH_COMPLETE)
    ? types.GAME_SEARCH_FETCH_COMPLETE
    : action.type;

  return reducers[type] ? reducers[type](state, action) : state;
};

export default gameSearchReducer;
