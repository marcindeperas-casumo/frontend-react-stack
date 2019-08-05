// @flow
import http from "Lib/http";
import type {
  AllLimits,
  AllLimitsOnlyValues,
  DepositKinds,
  DepositLimit,
  DepositLimitPreadjust,
} from "Models/playOkay/depositLimits";

// See swagger: limits.at.casumotest.local:8080/swagger-ui.html
export const BASE_URL = "/casino-player/limits/api/limits";
export const ES_PLAYER_LIFECYCLE =
  "/casino-player/es-player-lifecycle/api/player";

export function getAllLimits(): Promise<DepositLimit[]> {
  return http.get(BASE_URL);
}

export function remainingLimits(): Promise<AllLimitsOnlyValues> {
  return http.get(`${BASE_URL}/DGOJ_DEPOSIT_LIMIT/remaining`);
}

export function limitAdjust(data: AllLimits): Promise<DepositLimit> {
  return http.post(`${BASE_URL}/DGOJ_DEPOSIT_LIMIT/adjust`, data);
}

export function limitPreadjust(): Promise<DepositLimitPreadjust> {
  return http.post(`${BASE_URL}/DGOJ_DEPOSIT_LIMIT/preadjust`);
}

export function limitCancel() {
  return http.post(`${BASE_URL}/DGOJ_DEPOSIT_LIMIT/cancelAdjustment`);
}

export function limitRevoke(kind: DepositKinds) {
  return http.post(`${BASE_URL}/${kind}/revoke`);
}

export function checkResponsibleGamblingTest() {
  return http.get(ES_PLAYER_LIFECYCLE);
}

export function sendResponsibleGamblingTest(passed: boolean) {
  return http.post(`${ES_PLAYER_LIFECYCLE}/questionnaire`, { passed });
}
