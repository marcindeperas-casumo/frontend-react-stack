// @flow
import * as R from "ramda";
import { createSelector } from "reselect";
import type { DepositLimitsReduxStore } from "./depositLimits.types";

export const getDepositLimitsSelector: any => DepositLimitsReduxStore = createSelector(
  R.path(["playOkay", "depositLimits"]),
  R.identity
);
