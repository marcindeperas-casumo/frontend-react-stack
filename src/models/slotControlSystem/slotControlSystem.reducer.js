// @flow
import { createReducer } from "Utils";
import type {
  StateType,
  SessionStateResponseType,
  GameplayStatsType,
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

type UpdateStatsActionType = {
  stats: GameplayStatsType,
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
  [ACTION_TYPES.UPDATE_STATS]: (state, action: UpdateStatsActionType) => {
    return {
      ...state,
      activeSession: {
        ...state.activeSession,
        stats: action.stats,
      },
    };
  },
};

export const slotControlSystemReducer = createReducer<StateType>(
  DEFAULT_STATE,
  handlers
);
