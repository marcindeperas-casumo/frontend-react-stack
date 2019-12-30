import { createSelector } from "reselect";
import { compose, defaultTo, prop, propEq, find } from "ramda";
import { limitTypes } from "Models/compliance/denmark/constants";

export const playOkaySelector = compose(
  defaultTo({}),
  prop("playOkay"),
  prop("playOkay")
);

export const moneyLimitsSelector = createSelector(
  playOkaySelector,
  compose(defaultTo([]), prop("moneyLimits"))
);

export const depositLimitHasBeenSetSelector = createSelector(
  playOkaySelector,
  compose(defaultTo(false), prop("isDepositLimitProperlySet"))
);

export const depositLimitSelector = createSelector(
  moneyLimitsSelector,
  find(propEq("limitType", limitTypes.DEPOSIT_LIMIT))
);
