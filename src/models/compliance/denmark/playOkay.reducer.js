import { createReducer } from "Utils";
import { types } from "./playOkay.actions";

export const DEFAULT_STATE = {
  moneyLimits: undefined,
  isDepositLimitProperlySet: false,
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
};

export const playOkayReducer = createReducer(DEFAULT_STATE, handlers);
