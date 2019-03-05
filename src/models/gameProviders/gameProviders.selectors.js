import {
  complement,
  compose,
  defaultTo,
  filter,
  propEq,
  prop,
  anyPass,
  isNil,
  isEmpty,
} from "ramda";
import { createSelector } from "reselect";
import { gameProviderEntitiesSelector } from "Models/schema";

export const areGameProvidersLoaded = createSelector(
  gameProviderEntitiesSelector,
  complement(anyPass([isEmpty, isNil]))
);

export const activeGameProvidersSelector = createSelector(
  gameProviderEntitiesSelector,
  compose(
    defaultTo({}),
    filter(propEq("inMaintenance", false))
  )
);

export const gameProviderBySlug = slug =>
  createSelector(
    gameProviderEntitiesSelector,
    compose(
      defaultTo({}),
      prop(slug)
    )
  );

export const areProviderGamesLoaded = provider =>
  createSelector(
    compose(
      prop("games"),
      gameProviderBySlug(provider)
    ),
    complement(anyPass([isNil, isEmpty]))
  );
