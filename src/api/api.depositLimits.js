// @flow
import http from "Lib/http";
import type {
  AllLimits,
  DepositKinds,
  DepositLimit,
  DepositLimitPreadjust,
} from "Models/playOkay/depositLimits";

// See swagger: limits.at.casumotest.local:8080/swagger-ui.html
export const BASE_URL = "/casino-player/limits/api/limits";
export const getAllLimits = (): Promise<DepositLimit[]> => http.get(BASE_URL);

export function limitAdjust(data: AllLimits): Promise<DepositLimit> {
  return http.post(`${BASE_URL}/DGOJ_DEPOSIT_LIMIT/adjust`, data);
}

export function limitPreadjust(): Promise<DepositLimitPreadjust> {
  return http.post(`${BASE_URL}/DGOJ_DEPOSIT_LIMIT/preadjust`);
}

export function limitCancel(kind: DepositKinds) {
  return http.post(`${BASE_URL}/${kind}/cancelAdjustment`);
}

export function limitRevoke(kind: DepositKinds) {
  return http.post(`${BASE_URL}/${kind}/revoke`);
}
