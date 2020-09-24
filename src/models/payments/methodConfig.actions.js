//@flow
import { actionTypes } from "./methodConfig.constants";
import type { LocalPaymentMethodType } from "./piq.types";

export const preparePaymentMethodConfig = (
  methodType: LocalPaymentMethodType
) => ({
  type: actionTypes.PREPARE_METHOD_CONFIG,
  methodType,
});

export const setPaymentMethodConfig = (
  methodType: LocalPaymentMethodType,
  config: Object
) => ({
  type: actionTypes.SET_METHOD_CONFIG,
  methodType,
  config,
});
