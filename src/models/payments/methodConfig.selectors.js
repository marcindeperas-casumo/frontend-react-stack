//@flow
import { createSelector } from "reselect";
import { prop, propOr } from "ramda";
import type { LocalPaymentMethodType } from "./piq.types";
export const getMethodConfigsSelector = prop("paymentMethodConfigs");

export const methodConfigSelector = (methodType: LocalPaymentMethodType) =>
  createSelector(
    getMethodConfigsSelector,
    propOr({}, methodType)
  );

export const methodsConfigsSelector = (
  methodTypes: Array<LocalPaymentMethodType>
) => getMethodConfigsSelector;
