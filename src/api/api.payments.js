// @flow
import http from "Lib/http";

export const PAYMENT_METHOD_TYPES_URL = "/api/common/query/paymentMethodTypes";

export const getPaymentMethodTypes = () => http.get(PAYMENT_METHOD_TYPES_URL);
