//@flow
import { actionTypes } from "./methodConfig.constants";
import type { LocalPaymentMethodType } from "./piq.types";
import type { MethodConfigType, ActionTypes } from "./methodConfig.types";

type PreparePaymentMethodConfigReturnType = {
  type: ActionTypes,
  methodType: LocalPaymentMethodType,
};

export const preparePaymentMethodConfig = (
  methodType: LocalPaymentMethodType
): PreparePaymentMethodConfigReturnType => ({
  type: actionTypes.PREPARE_METHOD_CONFIG,
  methodType,
});

type SetPaymentMethodConfigReturnType = {
  type: ActionTypes,
  methodType: LocalPaymentMethodType,
  config: MethodConfigType,
};

export const setPaymentMethodConfig = (
  methodType: LocalPaymentMethodType,
  config: Object
): SetPaymentMethodConfigReturnType => ({
  type: actionTypes.SET_METHOD_CONFIG,
  methodType,
  config,
});
