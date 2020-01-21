// @flow
import { createSelector } from "reselect";
import { path, identity } from "ramda";

export const isMenuOpen = createSelector(
  path(["menu", "open"]),
  identity
);
