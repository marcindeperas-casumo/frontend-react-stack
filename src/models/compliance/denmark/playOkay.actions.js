import * as api from "Api/api.playOkay";
import { types as fetchTypes } from "Models/fetch";

export const types = {
  PLAYOK_FETCH_ALL_LIMITS_START: "PLAYOK_FETCH_ALL_LIMITS_START",
  PLAYOK_FETCH_ALL_LIMITS_COMPLETED: "PLAYOK_FETCH_ALL_LIMITS_COMPLETED",
  PLAY_OKAY_DEPOSIT_LIMIT_SET: "PLAY_OKAY_DEPOSIT_LIMIT_SET",
  PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED:
    "PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED",
};

export const getAllLimits = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.PLAYOK_FETCH_ALL_LIMITS_START,
  postFetch: types.PLAYOK_FETCH_ALL_LIMITS_COMPLETED,
  asyncCall: api.getAllLimits,
  asyncCallData,
});

export const saveLimitAction = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.PLAY_OKAY_DEPOSIT_LIMIT_SET,
  postFetch: types.PLAY_OKAY_DEPOSIT_LIMIT_SET_COMPLETED,
  asyncCall: api.setDepositLimit,
  asyncCallData,
});
