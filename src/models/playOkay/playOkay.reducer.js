// @flow
import { createReducer } from "Utils";
import { types } from "./playOkay.actions";
import {
  type PlayOkayReduxStore,
  type LoginTimeLimits,
} from "./playOkay.types";

export const DEFAULT_STATE: PlayOkayReduxStore = {
  moneyLimits: undefined,
  isDepositLimitProperlySet: false,
};

type SetTimeLimitsAction = {
  limits: LoginTimeLimits,
};

const handlers = {
  [types.PLAYOK_FETCH_ALL_LIMITS_COMPLETED]: (state, { response }) => ({
    ...state,
    ...response,
  }),
  [types.PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED]: state => ({
    ...state,
    isDepositLimitProperlySet: true,
  }),
  [types.PLAY_OKAY_TIME_LIMITS_SET]: (
    state,
    { limits }: SetTimeLimitsAction
  ) => ({
    ...state,
    loginTimeLimits: {
      ...limits,
    },
  }),
};

export const playOkayReducer = createReducer<PlayOkayReduxStore>(
  DEFAULT_STATE,
  handlers
);
