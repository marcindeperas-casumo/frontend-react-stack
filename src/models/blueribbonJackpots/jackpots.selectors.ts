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

export const isStartGamesFeedOnSelector = () =>
  createSelector(blueRibbonJackpotStoreSelector, R.prop("isStartGamesFeedOn"));
