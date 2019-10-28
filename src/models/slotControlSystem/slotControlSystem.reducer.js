// @flow
import { createReducer } from "Utils";
import type { StateType } from "./slotControlSystem.types";
import { ACTION_TYPES } from "./slotControlSystem.constants";

const DEFAULT_STATE: StateType = {
  activeSession: null,
  endedSession: null,
};

const handlers = {
  [ACTION_TYPES.UPDATE_SESSION]: (state, action) => ({
    ...state,
    activeSession: {
      ...action.response,
      lastUpdateTime: Date.now(),
    },
  }),
  [ACTION_TYPES.INVALIDATE_SESSION]: (state, action) => ({
    ...state,
    activeSession: null,
    endedSession: state.activeSession && {
      id: state.activeSession.id,
      endTime: Date.now(),
    },
  }),
};

export const slotControlSystemReducer = createReducer<StateType>(
  DEFAULT_STATE,
  handlers
);
