// @flow
import { createSelector } from "reselect";
import { propEq, find, pathOr, propOr } from "ramda";
import { limitTypes } from "./constants";

export const playOkaySelector = pathOr({}, ["playOkay", "playOkay"]);

export const moneyLimitsSelector = createSelector(
  playOkaySelector,
  propOr([], "moneyLimits")
);

export const depositLimitHasBeenSetSelector = createSelector(
  playOkaySelector,
  propOr(false, "isDepositLimitProperlySet")
);

export const depositLimitSelector = createSelector(
  moneyLimitsSelector,
  find(propEq("limitType", limitTypes.DEPOSIT_LIMIT))
);
