import {
  complement,
  compose,
  defaultTo,
  propOr,
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
  compose(defaultTo({}))
);

export const gameProviderBySlug = slug =>
  createSelector(
    gameProviderEntitiesSelector,
    propOr({}, slug)
  );

export const gameProviderGameCount = provider =>
  createSelector(
    gameProviderBySlug(provider),
    propOr(0, "gameCount")
  );

export const gameProviderGames = provider =>
  createSelector(
    gameProviderBySlug(provider),
    propOr([], "games")
  );

export const areProviderGamesLoaded = provider =>
  createSelector(
    gameProviderGames(provider),
    complement(anyPass([isEmpty, isNil]))
  );
