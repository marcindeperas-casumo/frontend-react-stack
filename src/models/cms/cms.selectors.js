import { createSelector } from "reselect";
import { prop, compose, defaultTo, not, isNil } from "ramda";
import { getFetchTypeBySlug } from "Models/cms";
import { isNotFetched, isFetchingStarted } from "Models/fetch/selectors";

export const getCms = compose(
  defaultTo({}),
  prop("cms"),
  prop("schema")
);

export const getPage = slug =>
  createSelector(
    getCms,
    compose(
      defaultTo({}),
      prop(slug)
    )
  );

export const getField = ({ slug, field, defaultValue = null }) =>
  createSelector(
    getPage(slug),
    compose(
      defaultTo(defaultValue),
      prop(field),
      prop("fields")
    )
  );

export const isPageFetchingStarted = slug =>
  isFetchingStarted(getFetchTypeBySlug(slug));

// Checking if a page is fetched like this
// because if we fetch a lot of children by their
// parent (e.g. "/promotions.*") then the children's
// fetch information won't be in the fetch status
export const isPageFetched = slug =>
  createSelector(
    getCms,
    compose(
      not,
      isNil,
      prop(slug)
    )
  );

// Only fetch a page if it was not fetched yet and if it is not in the store already.
export const shouldFetchPage = slug =>
  createSelector(
    isPageFetched(slug),
    isNotFetched(getFetchTypeBySlug(slug)),
    (isPageObjectInStore, isNotFetched) => !isPageObjectInStore && isNotFetched
  );
