import { createSelector } from "reselect";
import { prop, defaultTo, compose } from "ramda";

export const migrationComponentsSelector = prop("migrationComponents");

export const activeComponents = createSelector(
  migrationComponentsSelector,
  compose(
    defaultTo([]),
    prop("activeComponents")
  )
);

export const routeParamsSelector = createSelector(
  migrationComponentsSelector,
  compose(
    defaultTo({}),
    prop("routeParams")
  )
);
