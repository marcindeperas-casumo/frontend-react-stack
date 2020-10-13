// @flow
import http from "Lib/http";

export const PAYMENT_METHOD_TYPES_URL = "/api/common/query/paymentMethodTypes";
export const PAYMENT_SESSION_TOKEN_URL = "/player/payments/api/session";

export const getPaymentMethodTypes = () => http.get(PAYMENT_METHOD_TYPES_URL);

export const getPaymentSessionToken = () => http.get(PAYMENT_SESSION_TOKEN_URL);

export const makePIQDepositRequest = (
  api: string,
  methodType: string,
  payload: any,
  locale: string
) =>
  http.post(`${api}${methodType}/deposit/process/?locale=${locale}`, payload);
