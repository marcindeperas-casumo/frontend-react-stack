import { createSelector } from "reselect";
import * as R from "ramda";

export const realityCheckSelector = createSelector(
  R.pathOr({}, ["player", "realityCheck"]),
  R.identity
);
