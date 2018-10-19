import { types } from "./cms.constants";

export const getFetchTypeBySlug = slug => `${types.FETCH_PAGE_BY_SLUG}-${slug}`;

export const getFetchCompleteTypeBySlug = slug =>
  `${types.FETCH_PAGE_BY_SLUG_COMPLETE}-${slug}`;
