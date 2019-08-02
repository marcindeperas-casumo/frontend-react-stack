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
};

type diffLimitsValuesFn1 = (
  AllLimitsOnlyValues,
  AllLimitsOnlyValues
) => AllLimitsOnlyValues;
type diffLimitsValuesFn2 = AllLimitsOnlyValues => AllLimitsOnlyValues => AllLimitsOnlyValues;
type diffLimitsValuesCurried = diffLimitsValuesFn1 & diffLimitsValuesFn2;
// diff limits values returns object with only keys that changed
const diffLimitsValues: diffLimitsValuesCurried = R.curry(
  (limitsBefore, limitsAfter) =>
    R.pipe(
      R.filter(
        (depositType: DepositKinds) =>
          limitsBefore[depositType] !== limitsAfter[depositType]
      ),
      R.pick(R.__, limitsAfter)
    )((["daily", "weekly", "monthly"]: DepositKinds[]))
);

function allLimitsHandler(state, { response }: { response: DepositLimit[] }) {
  const LimitDGOJ = R.find(kindEq("DGOJ_DEPOSIT_LIMIT"), response);
  const limits = R.path(["limit", "value"], LimitDGOJ);
  const rawAdjustments = R.prop("adjustment", LimitDGOJ);

  return {
    ...state,
    pendingLimitChanges:
      rawAdjustments &&
      R.evolve(
        {
          value: diffLimitsValues(limits),
        },
        rawAdjustments
      ),
    limits,
    undoable: R.prop("undoable", LimitDGOJ),
    lock: R.prop("lock", LimitDGOJ),
  };
}

const handlers = {
  [depositLimitsTypes.CANCEL_PENDING_LIMIT_CHANGE_DONE]: allLimitsHandler,
  [depositLimitsTypes.FETCH_ALL_DONE]: allLimitsHandler,
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
};

export const depositLimitsReducer = createReducer<DepositLimitsReduxStore>(
  DEFAULT_STATE,
  handlers
);
