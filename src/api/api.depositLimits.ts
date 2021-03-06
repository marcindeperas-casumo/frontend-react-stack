import type {
  AllLimits,
  AllLimitsOnlyValues,
  DepositLimit,
  DepositLimitPreadjust,
  LimitAdjustmentHistory,
} from "Models/playOkay/dgojDepositLimits";
import http from "Lib/http";

// See swagger: http://limits.k8s.casumotest.local/swagger-ui.html
const BASE = "/casino-player/limits/api";
const HISTORY = `${BASE}/audit/DGOJ_DEPOSIT_LIMIT`;
const ALL_LIMITS = `${BASE}/limits`;
const USER_LIMITS = `${ALL_LIMITS}/DGOJ_DEPOSIT_LIMIT`;
const ES_PLAYER_LIFECYCLE = "/casino-player/es-player-lifecycle/api/player";

export function getLimitsHistory(): Promise<LimitAdjustmentHistory[]> {
  return http.get(HISTORY);
}

export function getAllLimits(): Promise<DepositLimit[]> {
  return http.get(ALL_LIMITS);
}

export function remainingLimits(): Promise<AllLimitsOnlyValues> {
  return http.get(`${USER_LIMITS}/remaining`);
}

export function limitAdjust(data: AllLimits): Promise<DepositLimit> {
  return http.post(`${USER_LIMITS}/adjust`, data);
}

export function limitPreadjust(): Promise<DepositLimitPreadjust> {
  return http.get(`${USER_LIMITS}/preadjust`);
}

export function limitCancel() {
  return http.post(`${USER_LIMITS}/cancelAdjustment`);
}

export function limitRevoke() {
  return http.post(`${USER_LIMITS}/revoke`);
}

export function sendResponsibleGamblingTest(passed: boolean) {
  return http.post(`${ES_PLAYER_LIFECYCLE}/questionnaire`, { passed });
}
