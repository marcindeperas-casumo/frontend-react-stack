import { createSelector } from "reselect";
import { cmsEntitiesSelector } from "Models/schema/selector";
import { prop, compose, defaultTo, isEmpty, not, identity } from "ramda";
import { getFetchTypeBySlug } from "Models/cms";

export const slugSelectorFactory = slug =>
  createSelector(
    cmsEntitiesSelector,
    compose(
      defaultTo({}),
      prop(slug)
    )
  );

export const fieldSelectorFactory = ({ slug, field, defaultValue = null }) =>
  createSelector(
    slugSelectorFactory(slug),
    compose(
      defaultTo(defaultValue),
      prop(field),
      prop("fields")
    )
  );

export const isPageLoadedFactory = slug =>
  createSelector(
    slugSelectorFactory(slug),
    compose(
      not,
      isEmpty
    )
  );

export const isPageFetchedFactory = slug =>
  createSelector(
    identity,
    compose(
      Boolean,
      prop(getFetchTypeBySlug(slug)),
      prop("fetch")
    )
  );

export const shouldFetchPageFactory = slug =>
  createSelector(
    isPageLoadedFactory(slug),
    isPageFetchedFactory(slug),
    (isLoaded, isFetched) => !isLoaded && !isFetched
  );
