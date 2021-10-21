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

export const winAnimationSelector = createSelector(
  blueRibbonJackpotStoreSelector,
  R.prop("winAnimationRunning")
);

export const gameJackpotSlugSelector = (slug: string) =>
  createSelector(eligibleGamesBySlugSelector, R.prop(slug));
