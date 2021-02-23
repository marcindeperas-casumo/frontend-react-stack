// @flow
import * as R from "ramda";
import { createReducer } from "Utils";
import type {
  StateType,
  SessionStateResponseType,
  GameSessionStatsType,
} from "./slotControlSystem.types";
import { ACTION_TYPES } from "./slotControlSystem.constants";

const DEFAULT_STATE: StateType = {
  slugToCategoryMap: {},
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
  [ACTION_TYPES.UPDATE_ACTIVE_SESSION_STATS]: (
    state,
    { data }: { data: GameSessionStatsType }
  ) => {
    return {
      ...state,
      activeSession: R.mergeDeepRight(state.activeSession, data),
    };
  },
  [ACTION_TYPES.UPDATE_SLUG_TO_CATEGORY_MAP]: (
    state,
    { slug, category }: { slug: string, category: string }
  ) => {
    return {
      ...state,
      slugToCategoryMap: {
        ...state.slugToCategoryMap,
        [slug]: category,
      },
    };
  },
};

export const slotControlSystemReducer = createReducer<StateType>(
  DEFAULT_STATE,
  handlers
);
