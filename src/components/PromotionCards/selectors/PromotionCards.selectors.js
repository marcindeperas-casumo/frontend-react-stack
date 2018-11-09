import { createSelector } from "reselect";
import { slugSelectorFactory } from "Reducers/cms";
import { prop, compose, defaultTo } from "ramda";

export const promotionsSlugSelectorFactory = slug =>
  createSelector(
    slugSelectorFactory(slug),
    compose(
      defaultTo([]),
      prop("promotions"),
      prop("fields")
    )
  );
