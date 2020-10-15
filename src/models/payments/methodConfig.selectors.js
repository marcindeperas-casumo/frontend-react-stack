//@flow
import { createSelector } from "reselect";
import { prop, propOr } from "ramda";
import type { LocalPaymentMethodType } from "./piq.types";

export const getMethodConfigSelector = prop("paymentMethodConfigs");

export const getAllMethodsConfigsSelector = createSelector(
  getMethodConfigSelector,
  propOr({}, "methods")
);

export const methodConfigSelector = (methodType: LocalPaymentMethodType) =>
  createSelector(
    getAllMethodsConfigsSelector,
    propOr({}, methodType)
  );

export const methodsConfigsSelector = (
  methodTypes: Array<LocalPaymentMethodType>
) => getAllMethodsConfigsSelector;
