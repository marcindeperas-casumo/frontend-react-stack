// @flow
import { createReducer } from "Utils";
import { types } from "./playOkay.actions";
// @ts-expect-error ts-migrate(2459) FIXME: Module '"./playOkay.types"' declares 'type' locall... Remove this comment to see the full error message
import { type PlayOkayReduxStore } from "./playOkay.types";

export const DEFAULT_STATE: PlayOkayReduxStore = {
  moneyLimits: undefined,
  loginTimeLimits: [],
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

export const playOkayReducer = createReducer<PlayOkayReduxStore>(
  DEFAULT_STATE,
  handlers
);
