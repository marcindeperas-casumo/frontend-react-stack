// @flow
import http from "Lib/http";
import type {
  GetAllLimitsProps,
  SetDepositLimitProps,
  SetLoginTimeLimitProps,
} from "Models/playOkay";

const allPlayOkLimitsUrl = playerId => `/api/common/query/playok/${playerId}`;
const setDepositLimitUrl = "/api/common/command/player/setDepositLimit";
const setLoginTimeLimitUrl = "/api/common/command/player/setLoginTimeLimit";

export const getAllLimits = ({ playerId }: GetAllLimitsProps) =>
  http.get(allPlayOkLimitsUrl(playerId));

export const setDepositLimit = ({
  playerId,
  limit,
  periodSetting,
}: SetDepositLimitProps) =>
  http.post(setDepositLimitUrl, {
    playerId,
    limit,
    periodSetting,
  });

export const setLoginTimeLimit = ({
  playerId,
  limitInMinutes,
  periodSetting,
}: SetLoginTimeLimitProps) =>
  http.post(setLoginTimeLimitUrl, {
    playerId,
    limitInMinutes,
    periodSetting,
  });
