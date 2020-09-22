import { createReducer } from "Utils";
import { actionTypes } from "./methodConfig.constants";

const DEFAULT_STATE = {};

const handlers = {
  [actionTypes.SET_METHOD_CONFIG]: (state, action) => ({
    ...state,
    [action.methodType]: action.config,
  }),
};

export const methodConfigReducer = createReducer(DEFAULT_STATE, handlers);
