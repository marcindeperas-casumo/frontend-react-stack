// @flow
import * as api from "Api/api.playOkay";
import { types as fetchTypes } from "Models/fetch";
import { types, type Period } from "Models/playOkay";
import { type SetLoginTimeLimitProps } from "./timeLimits.types";

export const getSaveLoginTimeLimitActionName = (period: Period) =>
  `${types.PLAY_OKAY_TIME_LIMIT_SET}_${period}`;

export const saveLoginTimeLimitAction = (
  asyncCallData: SetLoginTimeLimitProps
) => ({
  type: fetchTypes.FETCH,
  name: getSaveLoginTimeLimitActionName(asyncCallData.periodSetting),
  postFetch: types.PLAY_OKAY_TIME_LIMIT_SET_COMPLETED,
  asyncCall: api.setLoginTimeLimit,
  asyncCallData,
});
