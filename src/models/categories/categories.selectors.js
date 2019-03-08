import { createSelector } from "reselect";
import { activeGameProvidersSelector } from "Models/gameProviders";
import { compose, values, omit, map } from "ramda";
import { country as getCountry } from "Models/handshake";

export const gameProvidersRoute = createSelector(
  getCountry,
  country => `/${country}/games/provider`
);

export const gameProvidersListSelector = createSelector(
  activeGameProvidersSelector,
  gameProvidersRoute,
  (providers, route) =>
    compose(
      map(provider => {
        const providerWithUrl = {
          ...provider,
          url: `${route}/${provider.slug}`,
          id: `game-provider-${provider.slug}`,
        };
        return omit(["slug", "name", "inMaintenance"])(providerWithUrl);
      }),
      values
    )(providers)
);
