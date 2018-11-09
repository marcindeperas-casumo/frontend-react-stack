import { createSelector } from "reselect";
import { slugSelectorFactory } from "Reducers/cms";
import { prop, compose, defaultTo } from "ramda";

export const promotionsSlugSelectorFactory = slug =>
  createSelector(
    slugSelectorFactory(slug),
    compose(
      defaultTo([]),
      // TODO: uncomment the following 2 lines. Remove the childslugs prop.
      // prop("promotions"),
      // prop("fields")
      prop("childSlugs")
    )
  );
