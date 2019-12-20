// @flow
import { createReducer } from "Utils";
import type {
  StateType,
  SessionStateResponseType,
} from "./slotControlSystem.types";
import { ACTION_TYPES } from "./slotControlSystem.constants";

const DEFAULT_STATE: StateType = {
  lastUpdateTime: 0,
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
      lastUpdateTime: Date.now(),
      activeSession: action.response.activeSession,
      lastEndedSession: action.response.lastEndedSession,
      activeExclusion: action.response.activeExclusion,
    };
  },
};

export const slotControlSystemReducer = createReducer<StateType>(
  DEFAULT_STATE,
  handlers
);
