import { createSelector } from "reselect";
import { prop, propOr } from "ramda";

export const getMethodConfigsSelector = prop("paymentMethodConfigs");

export const methodConfigSelector = methodType =>
  createSelector(
    getMethodConfigsSelector,
    propOr({}, methodType)
  );
