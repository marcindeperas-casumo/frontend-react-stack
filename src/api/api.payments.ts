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
  getPaymentSessionToken().then(session =>
    http.post(`${api}${methodType}/deposit/process/?locale=${locale}`, {
      ...payload,
      sessionId: session.id,
    })
  );

export const getTransactionStatus = (
  api: string,
  playerId: string,
  merchantId: string,
  txId: string
) =>
  getPaymentSessionToken().then(session =>
    http.get(
      `${api}user/transaction/${merchantId}/${playerId}/${txId}/status?sessionId=${session.id}`
    )
  );
