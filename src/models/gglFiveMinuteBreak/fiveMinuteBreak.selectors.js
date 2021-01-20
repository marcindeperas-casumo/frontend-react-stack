// @flow
import * as R from "ramda";
import { createSelector } from "reselect";

export const fiveMinuteBreakSelector = createSelector(
  R.prop("fiveMinuteBreak"),
  R.identity
);
