import { types } from "./cms.constants";

export const getFetchTypeBySlug = slug =>
  `${types.FETCH_PAGE_BY_SLUG}-${omitSlugBasepath(slug)}`;

export const getFetchCompleteTypeBySlug = slug =>
  `${types.FETCH_PAGE_BY_SLUG_COMPLETE}-${omitSlugBasepath(slug)}`;

export const omitSlugBasepath = (slug = "") => {
  const parts = slug.split(".");
  const lastIndex = parts.length - 1;

  return parts[lastIndex];
};
