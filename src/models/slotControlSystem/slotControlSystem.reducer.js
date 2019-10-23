// @flow
import { createReducer } from "Utils";
import type { StateType } from "./slotControlSystem.types";
import { ACTION_TYPES } from "./slotControlSystem.constants";

const DEFAULT_STATE: StateType = {
  activeSession: null,
  updatedAt: null,
};

const handlers = {
  [ACTION_TYPES.UPDATE_SESSION]: (state, action) => ({
    ...state,
    activeSession: action.response,
    updatedAt: Date.now(),
  }),
  [ACTION_TYPES.INVALIDATE_SESSION]: (state, action) => ({
    ...state,
    activeSession: null,
  }),
};

export const slotControlSystemReducer = createReducer<StateType>(
  DEFAULT_STATE,
  handlers
);
