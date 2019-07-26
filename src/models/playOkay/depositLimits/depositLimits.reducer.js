// @flow
import * as R from "ramda";
import { createReducer } from "Utils";
import { depositLimitsTypes } from "./depositLimits.constants";
import type {
  DepositLimitsReduxStore,
  DepositLimit,
} from "./depositLimits.types";
import { kindEq } from "./depositLimits.selectors";

export const DEFAULT_STATE = {
  limits: undefined,
  preadjust: undefined,
  undoable: undefined,
  lock: undefined,
  remaining: undefined,
};

const handlers = {
  [depositLimitsTypes.FETCH_ALL_DONE]: (
    state,
    { response }: { response: DepositLimit[] }
  ) => {
    const LimitDGOJ = R.find(kindEq("DGOJ_DEPOSIT_LIMIT"), response);

    return {
      ...state,
      limits: R.path(["limit", "value"], LimitDGOJ),
      undoable: R.prop("undoable", LimitDGOJ),
      lock: R.prop("lock", LimitDGOJ),
    };
  },
  [depositLimitsTypes.ADJUST_DONE]: (state, { response }) => ({
    ...state,
    limits: R.pathOr(state.limits, ["limit", "value"], response),
    undoable: R.propOr(state.undoable, "undoable", response),
    lock: R.propOr(state.lock, "lock", response),
  }),
  [depositLimitsTypes.PREADJUST_DONE]: (state, { response }) => ({
    ...state,
    preadjust: response,
  }),
  [depositLimitsTypes.REMAINING_LIMITS_DONE]: (state, { response }) => ({
    ...state,
    remaining: response?.value,
  }),
};

export const depositLimitsReducer = createReducer<DepositLimitsReduxStore>(
  DEFAULT_STATE,
  handlers
);
