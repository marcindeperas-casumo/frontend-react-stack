/* eslint-disable-next-line filenames/match-exported */
import { types } from "./gameSearch.constants";

const DEFAULT_STATE = { query: "" };

const handlers = {
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
  [types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_START]: state => ({
    ...state,
    loadingSuggested: true,
  }),
  [types.GAME_SEARCH_FETCH_SUGGESTED_GAMES_COMPLETE]: state => ({
    ...state,
    loadingSuggested: false,
  }),
};

export const gameSearchReducer = (state = DEFAULT_STATE, action) => {
  const type = action.type.startsWith(types.GAME_SEARCH_FETCH_COMPLETE)
    ? types.GAME_SEARCH_FETCH_COMPLETE
    : action.type;

  return handlers[type] ? handlers[type](state, action) : state;
};

export default gameSearchReducer;
