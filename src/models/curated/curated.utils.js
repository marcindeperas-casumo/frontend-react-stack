import * as R from "ramda";
import { types } from "Models/cms";
import { CURATED_SLUG } from "./curated.constants";

export const prefixCuratedSlug = slug => {
  const isString = typeof slug === "string";
  const prefix = `${CURATED_SLUG}.`;
  const isPrefixed = isString && R.startsWith(prefix, slug);

  if (!isString) {
    return "";
  }

  if (!isPrefixed) {
    return `${CURATED_SLUG}.${slug}`;
  }

  return slug;
};

export const takeFetchedCuratedPages = action => {
  return action.type.startsWith(
    `${types.FETCH_PAGE_BY_SLUG_COMPLETE}-${CURATED_SLUG}`
  );
};