// @flow
import { createSelector } from "reselect";
import { propEq, find, prop } from "ramda";
import { limitPeriod } from "../constants";
import { playOkaySelector } from "../playOkay.selectors";
// @ts-expect-error ts-migrate(2459) FIXME: Module '"./timeLimits.types"' declares 'type' loca... Remove this comment to see the full error message
import { type LoginTimeLimit } from "./timeLimits.types";

export const loginTimeLimitsSelector = createSelector(
  playOkaySelector,
  prop("loginTimeLimits")
);

export const dailyLoginTimeLimitSelector = createSelector<
  // @ts-expect-error ts-migrate(2558) FIXME: Expected 3 type arguments, but got 1.
  (any) => LoginTimeLimit | void
>(
  loginTimeLimitsSelector,
  find(propEq("period", limitPeriod.DAILY))
);

export const weeklyLoginTimeLimitSelector = createSelector<
  // @ts-expect-error ts-migrate(2558) FIXME: Expected 3 type arguments, but got 1.
  (any) => LoginTimeLimit | void
>(
  loginTimeLimitsSelector,
  find(propEq("period", limitPeriod.WEEKLY))
);

export const monthlyLoginTimeLimitSelector = createSelector<
  // @ts-expect-error ts-migrate(2558) FIXME: Expected 3 type arguments, but got 1.
  (any) => LoginTimeLimit | void
>(
  loginTimeLimitsSelector,
  find(propEq("period", limitPeriod.MONTHLY))
);

export const allLoginTimeLimitsDefinedSelector = createSelector<
  // @ts-expect-error ts-migrate(2558) FIXME: Expected 3 type arguments, but got 1.
  (any) => boolean
>(
  dailyLoginTimeLimitSelector,
  weeklyLoginTimeLimitSelector,
  monthlyLoginTimeLimitSelector,
  (daily, weekly, monthly) => Boolean(daily && weekly && monthly)
);
