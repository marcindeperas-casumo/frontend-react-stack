import { createSelector } from "reselect";
import * as R from "ramda";
import { currencySelector, localeSelector } from "Models/handshake";
import type {
  DepositLimitsReduxStore,
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
export const canIncreaseLimitsSelector: (
  state: any
) => boolean = createSelector(
  R.path([...basePath, "pendingLimitChanges"]),
  R.path([...basePath, "lock"]),
  (pendingLimitChanges, lock) => {
    if (!pendingLimitChanges && !lock) {
      return true;
    }
    return false;
  }
);

// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, { pendingChanges: { limi... Remove this comment to see the full error message
export const getPendingLimitChangesSelector: (
  state: any
) => PendingDepositLimitsChangesSelected = createSelector(
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
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          value: R.prop(limitKind, pendingLimitChanges),
        })),
      allRemoved: allLimitsRemoved(pendingLimitChanges),
    };
  }
);

// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, { currency: unknown; loc... Remove this comment to see the full error message
export const getCurrencyAndLocaleSelector: (
  state: any
) => {
  currency: string;
  locale: string;
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

// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, { limitKind: "daily" | "... Remove this comment to see the full error message
export const getDepositLimitsForOverviewScreenSelector: (
  state: any
) => DepositLimitsSelected = createSelector(
  R.path([...basePath, "limits"]),
  R.path([...basePath, "remaining"]),
  (limits, remaining) => {
    if (!limits) {
      return [];
    }

    return limitTypes.filter(R.has(R.__, limits)).map(limitKind => ({
      limitKind,
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      value: R.prop(limitKind, limits),
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      remaining: R.prop(limitKind, remaining),
    }));
  }
);

// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, Pick<unknown, never>, (r... Remove this comment to see the full error message
export const getDepositLimitsSelector: (
  state: any
) => DepositLimitsReduxStore = createSelector(
  R.path(basePath),
  R.omit(["history"])
);

// @ts-expect-error ts-migrate(2322) FIXME: Type 'OutputSelector<any, unknown, (res: unknown) ... Remove this comment to see the full error message
export const getDepositLimitsHistorySelector: (
  state: any
) => DepositLimitsReduxStore = createSelector(
  R.path([...basePath, "history"]),
  R.identity
);

export const kindEq = R.propEq("kind");

export const hasRule = (
  rule: DepositLimitPreadjustRules,
  rules: Array<DepositLimitPreadjustRules>
): boolean => R.pipe(R.find(R.equals(rule)), Boolean)(rules);
