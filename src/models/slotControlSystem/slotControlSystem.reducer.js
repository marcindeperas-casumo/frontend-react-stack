// @flow
import { omit } from "ramda";
import { createReducer } from "Utils";
import type { StateType } from "./slotControlSystem.types";
import { ACTION_TYPES } from "./slotControlSystem.constants";

const DEFAULT_STATE: StateType = {
  activeSession: null,
  endedSession: null,
  activeExclusion: null,
};
// TODO revisit these handlers while the API takes shape
const handlers = {
  [ACTION_TYPES.UPDATE_SESSION]: (state, action) => {
    const newState = {
      ...state,
      activeSession: action.response && {
        ...omit(["playerId"], action.response),
        lastUpdateTime: Date.now(),
      },
    };
    if (action.response) {
      return newState;
    }

    if (state.activeSession) {
      return {
        ...newState,
        endedSession: {
          id: state.activeSession.id,
          endTime: state.activeSession.expiringTime,
        },
      };
    }

    return newState;
  },
  [ACTION_TYPES.INVALIDATE_SESSION]: (state, action) => ({
    ...state,
    activeSession: null,
    endedSession: state.activeSession && {
      id: state.activeSession.id,
      endTime: state.activeSession.expiringTime,
    },
  }),
};

export const slotControlSystemReducer = createReducer<StateType>(
  DEFAULT_STATE,
  handlers
);
