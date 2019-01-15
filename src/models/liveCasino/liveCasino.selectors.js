import { createSelector } from "reselect";
import { prop, compose, identity, defaultTo } from "ramda";

export const liveTableEntitySelector = createSelector(
  identity,
  compose(
    defaultTo({}),
    prop("liveTable"),
    prop("schema")
  )
);

export const liveTableSelector = id =>
  createSelector(
    liveTableEntitySelector,
    compose(
      defaultTo(null),
      prop(id)
    )
  );
