import { createSelector } from "reselect";
import { curatedEntitiesSelector } from "Reducers/schema/selector";
import { prop, compose, defaultTo, isEmpty, not, identity } from "ramda";
import { types } from "Reducers/curated";

export const curatedSelector = () =>
  createSelector(curatedEntitiesSelector, defaultTo({}));

export const isPageLoadedFactory = () =>
  createSelector(
    curatedSelector,
    compose(
      not,
      isEmpty
    )
  );

export const isPageFetchedFactory = () =>
  createSelector(
    identity,
    compose(
      Boolean,
      prop(types.CURATED_FETCH_PAGE),
      prop("fetch")
    )
  );

export const shouldFetchPageFactory = () =>
  createSelector(
    isPageLoadedFactory(),
    isPageFetchedFactory(),
    (isLoaded, isFetched) => !isLoaded && !isFetched
  );
