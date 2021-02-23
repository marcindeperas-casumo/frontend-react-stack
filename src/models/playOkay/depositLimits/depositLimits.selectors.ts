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
// @ts-expect-error ts-migrate(2693) FIXME: 'boolean' only refers to a type, but is being used... Remove this comment to see the full error message
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

// @ts-expect-error ts-migrate(2693) FIXME: 'PendingDepositLimitsChangesSelected' only refers ... Remove this comment to see the full error message
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
          // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
          value: R.prop(limitKind, pendingLimitChanges),
        })),
      allRemoved: allLimitsRemoved(pendingLimitChanges),
    };
  }
);

export const getCurrencyAndLocaleSelector: any => {
  // @ts-expect-error ts-migrate(2693) FIXME: 'string' only refers to a type, but is being used ... Remove this comment to see the full error message
  currency: string,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'locale'.
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

// @ts-expect-error ts-migrate(2693) FIXME: 'DepositLimitsSelected' only refers to a type, but... Remove this comment to see the full error message
export const getDepositLimitsForOverviewScreenSelector: any => DepositLimitsSelected = createSelector(
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

// @ts-expect-error ts-migrate(2693) FIXME: 'DepositLimitsReduxStore' only refers to a type, b... Remove this comment to see the full error message
export const getDepositLimitsSelector: any => DepositLimitsReduxStore = createSelector(
  R.path(basePath),
  R.omit(["history"])
);

// @ts-expect-error ts-migrate(2693) FIXME: 'DepositLimitsReduxStore' only refers to a type, b... Remove this comment to see the full error message
export const getDepositLimitsHistorySelector: any => DepositLimitsReduxStore = createSelector(
  R.path([...basePath, "history"]),
  R.identity
);

// @ts-expect-error ts-migrate(2693) FIXME: 'boolean' only refers to a type, but is being used... Remove this comment to see the full error message
export const kindEq: DepositLimitKind => boolean = R.propEq("kind");

export const hasRule = (
  rule: DepositLimitPreadjustRules,
  rules: Array<DepositLimitPreadjustRules>
): boolean =>
  R.pipe(
    R.find(R.equals(rule)),
    Boolean
  )(rules);
