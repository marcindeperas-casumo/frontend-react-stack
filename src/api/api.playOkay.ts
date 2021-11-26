import http from "Lib/http";
import type { GetAllLimitsProps, SetDepositLimitProps } from "Models/playOkay";

const allPlayOkLimitsUrl = playerId => `/api/common/query/playok/${playerId}`;
const setDepositLimitUrl = "/api/common/command/player/setDepositLimit";

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
