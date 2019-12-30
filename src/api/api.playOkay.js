import http from "Lib/http";

const allPlayOkLimitsUrl = playerId => `/api/common/query/playok/${playerId}`;
const setDepositLimitUrl = "/api/common/command/player/setDepositLimit";

export const getAllLimits = playerId => () =>
  http.get(allPlayOkLimitsUrl(playerId));

export const setDepositLimit = (playerId, limit, periodSetting) => () =>
  http.post(setDepositLimitUrl, {
    playerId,
    limit,
    periodSetting,
  });
