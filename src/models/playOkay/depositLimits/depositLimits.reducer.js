// @flow
import * as R from "ramda";
import { createReducer } from "Utils";
import { depositLimitsTypes } from "./depositLimits.constants";
import type { DepositLimitsReduxStore } from "./depositLimits.types";

export const DEFAULT_STATE = {
  limits: undefined,
  preadjust: undefined,
  undoable: undefined,
  lock: undefined,
};

const handlers = {
  [depositLimitsTypes.FETCH_ALL_DONE]: (state, { response }) => ({
    ...state,
    limits: R.path([1, "limit", "value"], response),
    undoable: R.path([1, "undoable"], response),
    lock: R.path([1, "lock"], response),
  }),
  [depositLimitsTypes.ADJUST_DONE]: (state, { response }) => ({
    ...state,
    limits: R.pathOr(state.limits, ["limit", "value"], response),
    undoable: R.propOr(state.undoable, ["undoable"], response),
    lock: R.propOr(state.lock, ["lock"], response),
  }),
  [depositLimitsTypes.PREADJUST_DONE]: (state, { response }) => ({
    ...state,
    preadjust: response,
  }),
};

export const depositLimitsReducer = createReducer<DepositLimitsReduxStore>(
  DEFAULT_STATE,
  handlers
);
