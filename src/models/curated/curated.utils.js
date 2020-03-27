// @flow
import * as R from "ramda";
import { CURATED_SLUG } from "./curated.constants";

export const prefixCuratedSlug = (slug: string) => {
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
