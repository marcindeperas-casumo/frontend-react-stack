import { createSelector } from "reselect";
import { prop, defaultTo, compose } from "ramda";

export const routerComponentsSelector = prop("router");

export const activeComponents = createSelector(
  routerComponentsSelector,
  // @ts-expect-error: apply fix if you know the context
  compose(defaultTo([]), prop("activeComponents"))
);

export const routeParamsSelector = createSelector(
  routerComponentsSelector,
  // @ts-expect-error: apply fix if you know the context
  compose(defaultTo([]), prop("routeParams"))
);
