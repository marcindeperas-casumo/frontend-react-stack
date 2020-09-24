//@flow
import { actionTypes } from "./methodConfig.constants";
import type { localPaymentTypesValues } from "./piq.constants";

export const preparePaymentMethodConfig = (
  methodType: localPaymentTypesValues
) => ({
  type: actionTypes.PREPARE_METHOD_CONFIG,
  methodType,
});

export const setPaymentMethodConfig = (
  methodType: localPaymentTypesValues,
  config: any
) => ({
  type: actionTypes.SET_METHOD_CONFIG,
  methodType,
  config,
});
