import { createSelector } from "reselect";
import { compose, values, omit, map } from "ramda";
import { activeGameProvidersSelector } from "Models/gameProviders";

export const gameProvidersListSelector = createSelector(
  activeGameProvidersSelector,
  compose(
    map(provider => {
      const providerWithUrl = {
        ...provider,
        url: `/games/provider/${provider.slug}`,
        id: `game-provider-${provider.slug}`,
      };
      return omit(["gameCount", "slug", "name", "inMaintenance"])(
        providerWithUrl
      );
    }),
    values
  )
);
