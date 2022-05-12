import { createSelector } from "reselect";
import * as R from "ramda";
import { TJackpotsReduxStore } from "./jackpots.reducer";

export const blueRibbonJackpotStoreSelector = (
  state: any
): TJackpotsReduxStore => state.blueribbonJackpot;

export const blueRibbonHandshakeSelector = createSelector(
  blueRibbonJackpotStoreSelector,
  R.prop("handshake")
);

export const eligibleGamesBySlugSelector = createSelector(
  blueRibbonJackpotStoreSelector,
  R.prop("eligibleGamesBySlug")
);

export const gameJackpotSlugSelector = (slug: string) =>
  createSelector(eligibleGamesBySlugSelector, R.prop(slug));

export const blueRibbonJackpotsSelector = createSelector(
  blueRibbonJackpotStoreSelector,
  R.prop("blueRibbonjackpots")
);

export const blueRibbonJackpotBySlugSelector = (slug: string) =>
  createSelector(
    blueRibbonJackpotsSelector,
    jackpots => jackpots[slug]?.composedJackpot
  );

export const sdkPotsSelector = createSelector(
  blueRibbonJackpotStoreSelector,
  R.prop("sdkPots")
);
