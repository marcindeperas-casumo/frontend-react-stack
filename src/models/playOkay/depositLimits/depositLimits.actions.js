// @flow
import * as R from "ramda";
import * as api from "Api/api.depositLimits";
import { types as fetchTypes } from "Models/fetch";
import { depositLimitsTypes } from "./depositLimits.constants";
import type { AllLimits } from "./depositLimits.types";

export const init = () => (dispatch: ThunkDispatch) => {
  dispatch(getAllLimits);
  dispatch(limitPreadjust);
  dispatch(getRemainingLimits);
  dispatch(checkResponsibleGamblingTest);
};

export const getAllLimits = {
  type: fetchTypes.FETCH,
  name: depositLimitsTypes.FETCH_ALL,
  postFetch: depositLimitsTypes.FETCH_ALL_DONE,
  asyncCall: api.getAllLimits,
};

export const getRemainingLimits = {
  type: fetchTypes.FETCH,
  name: depositLimitsTypes.REMAINING_LIMITS,
  postFetch: depositLimitsTypes.REMAINING_LIMITS_DONE,
  asyncCall: api.remainingLimits,
};

export const checkResponsibleGamblingTest = {
  type: fetchTypes.FETCH,
  name: depositLimitsTypes.RESPONSIBLE_GAMBLING_TEST,
  postFetch: depositLimitsTypes.RESPONSIBLE_GAMBLING_TEST_DONE,
  asyncCall: api.checkResponsibleGamblingTest,
};

export const limitPreadjust = {
  type: fetchTypes.FETCH,
  name: depositLimitsTypes.PREADJUST,
  postFetch: depositLimitsTypes.PREADJUST_DONE,
  asyncCall: api.limitPreadjust,
};

export const getLimitsHistory = () => ({
  type: fetchTypes.FETCH,
  name: depositLimitsTypes.GET_HISTORY,
  postFetch: depositLimitsTypes.GET_HISTORY_DONE,
  asyncCall: api.getLimitsHistory,
});

export function limitAdjust(limitAdjustement: AllLimits) {
  return (dispatch: ThunkDispatch) => {
    const shouldRemove = R.pipe(
      R.toPairs,
      R.find(([limit, value]) => R.equals(value, null))
    )(limitAdjustement);
    const limitChangeHandler = response =>
      dispatch({
        type: depositLimitsTypes.ADJUST_DONE,
        response,
      });

    if (shouldRemove) {
      return api.limitRevoke().then(limitChangeHandler);
    }
    return api.limitAdjust(limitAdjustement).then(limitChangeHandler);
  };
}

export function limitCancel() {
  return {
    type: fetchTypes.FETCH,
    name: depositLimitsTypes.CANCEL_PENDING_LIMIT_CHANGE,
    postFetch: depositLimitsTypes.CANCEL_PENDING_LIMIT_CHANGE_DONE,
    asyncCall: api.limitCancel,
  };
}
