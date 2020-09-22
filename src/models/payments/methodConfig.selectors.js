import { createSelector } from "reselect";
import { prop, propOr } from "ramda";

export const getMethodConfigs = createSelector(prop("paymentMethodConfigs"));

export const methodConfigSelector = methodType =>
  createSelector(
    getMethodConfigs,
    propOr({}, methodType)
  );
