// @flow
import { createReducer } from "Utils";
import type {
  StateType,
  SessionStateResponseType,
} from "./slotControlSystem.types";
import { ACTION_TYPES } from "./slotControlSystem.constants";

const DEFAULT_STATE: StateType = {
  activeSession: null,
  lastEndedSession: null,
  activeExclusion: null,
};

type UpdateSessionActionType = {
  response: SessionStateResponseType,
};

const handlers = {
  [ACTION_TYPES.UPDATE_SESSION]: (state, action: UpdateSessionActionType) => {
    return {
      ...state,
      activeSession: action.response.activeSession && {
        ...action.response.activeSession,
        lastUpdateTime: Date.now(),
      },
      lastEndedSession: action.response.lastEndedSession && {
        ...action.response.lastEndedSession,
      },
    };
  },
};

export const slotControlSystemReducer = createReducer<StateType>(
  DEFAULT_STATE,
  handlers
);
