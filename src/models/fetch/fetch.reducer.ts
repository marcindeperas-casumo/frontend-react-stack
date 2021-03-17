import { createReducer } from "Utils";
import { types } from "./fetch.constants";

const DEFAULT_STATE = {};

const handlers = {
  [types.SENDING_REQUEST]: (state, action) => ({
    ...state,
    [action.name]: {
      ...state[action.name],
      isFetching: true,
    },
  }),
  [types.REQUEST_COMPLETE]: (state, action) => ({
    ...state,
    [action.name]: {
      ...state[action.name],
      isFetching: false,
    },
  }),
  [types.REQUEST_ERROR]: (state, action) => ({
    ...state,
    [action.name]: {
      ...state[action.name],
      error: action.error,
      response: null,
    },
  }),
  [types.CLEAR_ERROR]: (state, action) => ({
    ...state,
    [action.name]: {
      ...state[action.name],
      error: null,
    },
  }),
};

export const fetchReducer = createReducer(DEFAULT_STATE, handlers);

export default fetchReducer;
