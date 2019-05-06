// @flow
import { createSelector } from "reselect";

export const isPromotionOptedInSelector = (slug: string) => {
  return createSelector(
    state => state.promotions,
    promotions => (promotions[slug] && promotions[slug].checked) || null
  );
};
