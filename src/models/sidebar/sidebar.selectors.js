// @flow
import { createSelector } from "reselect";
import { path, identity } from "ramda";

export const isSidebarOpen = createSelector(
  path(["sidebar", "open"]),
  identity
);
