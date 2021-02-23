// @flow
import * as api from "Api/api.playOkay";
import { types as fetchTypes } from "Models/fetch";
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
import { types, type Period } from "Models/playOkay";
// @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'type'.
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
