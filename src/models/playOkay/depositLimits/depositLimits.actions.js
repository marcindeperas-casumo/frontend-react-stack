// @flow
import * as api from "Api/api.depositLimits";
import { types as fetchTypes } from "Models/fetch";
import { depositLimitsTypes } from "./depositLimits.constants";
import type { AllLimits } from "./depositLimits.types";

export const getAllLimits = () => ({
  type: fetchTypes.FETCH,
  name: depositLimitsTypes.FETCH_ALL,
  postFetch: depositLimitsTypes.FETCH_ALL_DONE,
  asyncCall: api.getAllLimits,
});

export const limitPreadjust = () => ({
  type: fetchTypes.FETCH,
  name: depositLimitsTypes.PREADJUST,
  postFetch: depositLimitsTypes.PREADJUST_DONE,
  asyncCall: api.limitPreadjust,
});

export function limitAdjust(limitAdjustement: AllLimits) {
  return (dispatch: ThunkDispatch) => {
    // when this request is processing we are showing loader
    // using our fetch action would make it really awkward.
    return api.limitAdjust(limitAdjustement).then(response =>
      dispatch({
        type: depositLimitsTypes.ADJUST_DONE,
        response,
      })
    );
  };
}
