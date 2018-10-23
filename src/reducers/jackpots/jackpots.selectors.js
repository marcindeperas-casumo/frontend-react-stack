import { createSelector } from "reselect";
import { prop, compose, identity, defaultTo } from "ramda";

export const jackpotEntitySelector = createSelector(
  identity,
  compose(
    defaultTo({}),
    prop("jackpot"),
    prop("schema")
  )
);

export const jackpotSelectorFactory = id =>
  createSelector(
    jackpotEntitySelector,
    compose(
      defaultTo(null),
      prop(id)
    )
  );
