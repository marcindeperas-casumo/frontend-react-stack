// @flow
import * as R from "ramda";
import { createReducer } from "Utils";
import { depositLimitsTypes } from "./depositLimits.constants";
import type {
  AllLimitsOnlyValues,
  DepositKinds,
  DepositLimitsReduxStore,
  DepositLimit,
  ResponsibleGamblingTest,
  LimitAdjustmentHistory,
} from "./depositLimits.types";
import { kindEq } from "./depositLimits.selectors";

export const DEFAULT_STATE = {
  limits: undefined,
  preadjust: undefined,
  undoable: undefined,
  lock: undefined,
  remaining: undefined,
  responsibleGamblingTest: undefined,
  pendingLimitChanges: undefined,
  history: undefined,
};

const defaultLimit: AllLimitsOnlyValues = {
  daily: null,
  weekly: null,
  monthly: null,
};
type diffLimitsValuesFn1 = (
  AllLimitsOnlyValues,
  AllLimitsOnlyValues
) => AllLimitsOnlyValues;
type diffLimitsValuesFn2 = AllLimitsOnlyValues => AllLimitsOnlyValues => AllLimitsOnlyValues;
type diffLimitsValuesCurried = diffLimitsValuesFn1 & diffLimitsValuesFn2;
// diff limits values returns object with only keys that changed
const diffLimitsValues: diffLimitsValuesCurried = R.curry(
  (limitsBefore = defaultLimit, limitsAfter = defaultLimit) =>
    R.pipe(
      R.filter(
        (depositType: DepositKinds) =>
          limitsBefore?.[depositType] !== limitsAfter?.[depositType]
      ),
      R.pick(R.__, limitsAfter)
    )((["daily", "weekly", "monthly"]: DepositKinds[]))
);

function handleDGOJLimitChange(limitDGOJ: DepositLimit) {
  const limits = R.pathOr({}, ["limit", "value"], limitDGOJ);
  const rawAdjustments = R.prop("adjustment", limitDGOJ);

  return {
    pendingLimitChanges: rawAdjustments && {
      ...rawAdjustments,
      value: diffLimitsValues(limits, rawAdjustments.value),
    },
    limits,
    undoable: R.prop("undoable", limitDGOJ),
    lock: R.prop("lock", limitDGOJ),
  };
}

const handlers = {
  [depositLimitsTypes.CANCEL_PENDING_LIMIT_CHANGE_DONE]: (
    state,
    { response }
  ) => ({
    ...state,
    ...handleDGOJLimitChange(response),
  }),
  [depositLimitsTypes.FETCH_ALL_DONE]: (
    state,
    { response }: { response: DepositLimit[] }
  ) => {
    const limitDGOJ = R.find(kindEq("DGOJ_DEPOSIT_LIMIT"), response);

    return {
      ...state,
      ...handleDGOJLimitChange(limitDGOJ),
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
  [depositLimitsTypes.RESPONSIBLE_GAMBLING_TEST_DONE]: (
    state,
    { response }: { response: ResponsibleGamblingTest }
  ) => ({
    ...state,
    responsibleGamblingTest: response,
  }),
  [depositLimitsTypes.GET_HISTORY_DONE]: (
    state,
    { response }: { response: LimitAdjustmentHistory[] }
  ) => {
    // we're getting a lot of 💩 in that response...
    const history = R.map(x => {
      const before = R.path(["stateBefore", "limit", "value"], x);
      const after = R.path(["stateAfter", "limit", "value"], x);
      const diff = diffLimitsValues(before, after);

      return {
        id: x.id,
        timestamp: R.path(["request", "timestamp"], x),
        diff,
      };
    }, response);

    return {
      ...state,
      history,
    };
  },
};

export const depositLimitsReducer = createReducer<DepositLimitsReduxStore>(
  DEFAULT_STATE,
  handlers
);
