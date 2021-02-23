// @flow
import * as R from "ramda";
import { createSelector } from "reselect";
import { currencySelector, localeSelector } from "Models/handshake";
import type {
  DepositLimitsReduxStore,
  DepositLimitKind,
  DepositLimitPreadjustRules,
  DepositLimitsSelected,
  PendingDepositLimitsChangesSelected,
} from "./depositLimits.types";
import { limitTypes } from "./depositLimits.utils";

const basePath = ["playOkay", "depositLimits"];

const allLimitsRemoved = R.allPass([
  R.propEq("daily", null),
  R.propEq("weekly", null),
  R.propEq("monthly", null),
]);
export const canIncreaseLimitsSelector: any => boolean = createSelector(
  R.path([...basePath, "pendingLimitChanges"]),
  R.path([...basePath, "lock"]),
  (pendingLimitChanges, lock) => {
    if (!pendingLimitChanges && !lock) {
      return true;
    }
    return false;
  }
);

export const getPendingLimitChangesSelector: any => PendingDepositLimitsChangesSelected = createSelector(
  R.path([...basePath, "pendingLimitChanges", "value"]),
  pendingLimitChanges => {
    if (!pendingLimitChanges) {
      return {
        pendingChanges: [],
        allRemoved: false,
      };
    }

    return {
      pendingChanges: limitTypes
        .filter(R.has(R.__, pendingLimitChanges))
        .map(limitKind => ({
          limitKind,
          value: R.prop(limitKind, pendingLimitChanges),
        })),
      allRemoved: allLimitsRemoved(pendingLimitChanges),
    };
  }
);

export const getCurrencyAndLocaleSelector: any => {
  currency: string,
  locale: string,
} = createSelector(
  [
    currencySelector, // we're falling back to currency from handshake only when it's not present in limits
    R.path([...basePath, "limits", "currency"]),
    localeSelector,
  ],
  (defaultCurrency, currency, locale) => ({
    currency: currency || defaultCurrency,
    locale,
  })
);

export const getDepositLimitsForOverviewScreenSelector: any => DepositLimitsSelected = createSelector(
  R.path([...basePath, "limits"]),
  R.path([...basePath, "remaining"]),
  (limits, remaining) => {
    if (!limits) {
      return [];
    }

    return limitTypes.filter(R.has(R.__, limits)).map(limitKind => ({
      limitKind,
      value: R.prop(limitKind, limits),
      remaining: R.prop(limitKind, remaining),
    }));
  }
);

export const getDepositLimitsSelector: any => DepositLimitsReduxStore = createSelector(
  R.path(basePath),
  R.omit(["history"])
);

export const getDepositLimitsHistorySelector: any => DepositLimitsReduxStore = createSelector(
  R.path([...basePath, "history"]),
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
