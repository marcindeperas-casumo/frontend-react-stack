// @flow
import { createSelector } from "reselect";
import { propEq, find, prop } from "ramda";
import { limitPeriod } from "../constants";
import { playOkaySelector } from "../playOkay.selectors";
import { type LoginTimeLimit } from "./timeLimits.types";

export const loginTimeLimitsSelector = createSelector(
  playOkaySelector,
  prop("loginTimeLimits")
);

export const dailyLoginTimeLimitSelector = createSelector<
  (any) => LoginTimeLimit | void
>(
  loginTimeLimitsSelector,
  find(propEq("period", limitPeriod.DAILY))
);

export const weeklyLoginTimeLimitSelector = createSelector<
  (any) => LoginTimeLimit | void
>(
  loginTimeLimitsSelector,
  find(propEq("period", limitPeriod.WEEKLY))
);

export const monthlyLoginTimeLimitSelector = createSelector<
  (any) => LoginTimeLimit | void
>(
  loginTimeLimitsSelector,
  find(propEq("period", limitPeriod.MONTHLY))
);

export const allLoginTimeLimitsDefinedSelector = createSelector<
  (any) => boolean
>(
  dailyLoginTimeLimitSelector,
  weeklyLoginTimeLimitSelector,
  monthlyLoginTimeLimitSelector,
  (daily, weekly, monthly) => Boolean(daily && weekly && monthly)
);
