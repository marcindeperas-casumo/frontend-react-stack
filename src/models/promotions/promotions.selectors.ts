// @flow
import { createSelector } from "reselect";
import { view, lensIndex } from "ramda";
import { routeParamsSelector } from "Models/router";

export const isPromotionOptedInSelector = (slug: string) => {
  return createSelector(
    state => state.promotions,
    promotions => (promotions[slug] && promotions[slug].checked) || null
  );
};

export const routeSlugSelector = createSelector(
  routeParamsSelector,
  view(lensIndex(0))
);
