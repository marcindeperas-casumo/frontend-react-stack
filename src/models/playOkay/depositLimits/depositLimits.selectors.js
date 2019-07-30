// @flow
import * as R from "ramda";
import { createSelector } from "reselect";
import type {
  DepositLimitsReduxStore,
  DepositLimitKind,
  DepositLimitPreadjustRules,
} from "./depositLimits.types";

export const getDepositLimitsSelector: any => DepositLimitsReduxStore = createSelector(
  R.path(["playOkay", "depositLimits"]),
  R.identity
);

export const kindEq: DepositLimitKind => boolean = R.propEq("kind");

export const hasRule = (
  rule: DepositLimitPreadjustRules,
  rules: Array<DepositLimitPreadjustRules>
): boolean =>
  R.pipe(
    R.find(R.equals(rule)),
    Boolean
  )(rules);
