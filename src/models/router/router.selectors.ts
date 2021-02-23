import { createSelector } from "reselect";
import { prop, defaultTo, compose } from "ramda";

export const routerComponentsSelector = prop("router");

export const activeComponents = createSelector(
  routerComponentsSelector,
  compose(
    defaultTo([]),
    prop("activeComponents")
  )
);

export const routeParamsSelector = createSelector(
  routerComponentsSelector,
  compose(
    defaultTo([]),
    prop("routeParams")
  )
);
