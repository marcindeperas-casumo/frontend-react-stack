import * as api from "Api/api.playOkay";
import { types as fetchTypes } from "Models/fetch";

export const types = {
  PLAY_OKAY_DENMARK_CHECK: "PLAY_OKAY_DENMARK_CHECK",
  PLAYOK_FETCH_ALL_LIMITS: "PLAYOK_FETCH_ALL_LIMITS",
  PLAYOK_FETCH_ALL_LIMITS_COMPLETED: "PLAYOK_FETCH_ALL_LIMITS_COMPLETED",
  PLAY_OKAY_DEPOSIT_LIMIT_SET: "PLAY_OKAY_DEPOSIT_LIMIT_SET",
  PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED:
    "PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED",
};

export const getAllLimits = playerId => ({
  type: fetchTypes.FETCH,
  name: types.PLAYOK_FETCH_ALL_LIMITS,
  postFetch: types.PLAYOK_FETCH_ALL_LIMITS_COMPLETED,
  asyncCall: api.getAllLimits(playerId),
});

export const saveLimitAction = (playerId, limit, periodSetting) => ({
  type: fetchTypes.FETCH,
  name: types.PLAY_OKAY_DEPOSIT_LIMIT_SET,
  postFetch: types.PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED,
  asyncCall: api.setDepositLimit(playerId, limit, periodSetting),
});

export const initPlayOkayComplianceCheck = {
  type: types.PLAY_OKAY_DENMARK_CHECK,
};
