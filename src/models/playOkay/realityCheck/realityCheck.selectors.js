// @flow
import * as R from "ramda";
import { createSelector } from "reselect";

export const realityCheckSelector = createSelector(
  R.pathOr({}, ["player", "realityCheck"]),
  R.identity
);
