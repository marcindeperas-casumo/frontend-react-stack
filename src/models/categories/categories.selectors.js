import { createSelector } from "reselect";
import { activeGameProvidersSelector } from "Models/gameProviders";
import { compose, values, omit, map } from "ramda";

export const gameProvidersListSelector = createSelector(
  activeGameProvidersSelector,
  compose(
    map(provider => {
      const providerWithUrl = {
        ...provider,
        url: `/en/games/provider/${provider.slug}`,
      };
      return omit(["slug", "id", "name", "inMaintenance"])(providerWithUrl);
    }),
    values
  )
);
