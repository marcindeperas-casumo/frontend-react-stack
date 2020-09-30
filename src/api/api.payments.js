// @flow
import http from "Lib/http";

export const paymentMethodTypesUrl = "/api/common/query/paymentMethodTypes";

export const getPaymentMethodTypes = () => http.get(paymentMethodTypesUrl);
