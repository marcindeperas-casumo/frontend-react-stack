//@flow
import { actionTypes } from "./methodConfig.constants";
import { LOCAL_PAYMENT_TYPES } from "./piq.constants";

export const preparePaymentMethodConfig = (
  methodType: $Values<typeof LOCAL_PAYMENT_TYPES>
) => ({
  type: actionTypes.PREPARE_METHOD_CONFIG,
  methodType,
});

export const setPaymentMethodConfig = (
  methodType: $Values<typeof LOCAL_PAYMENT_TYPES>,
  config: any
) => ({
  type: actionTypes.SET_METHOD_CONFIG,
  methodType,
  config,
});
