import { types } from "Reducers/cms";

export const getFetchTypeBySlug = slug => `${types.FETCH_PAGE_BY_SLUG}-${slug}`;

export const getFetchCompleteTypeBySlug = slug =>
  `${types.FETCH_PAGE_BY_SLUG_COMPLETE}-${slug}`;

export const getFetchStoredTypeBySlug = slug =>
  `${types.FETCH_PAGE_BY_SLUG_STORED}-${slug}`;
