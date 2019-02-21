// @flow

import { FAVOURITE_SPORTS_SELECTOR_CONTEXT } from "../StageFavouritesProvider";
import {
  withFavouritesResult,
  noFavouritesResult,
} from "./favouriteSportsSelectorContextResult";

export const withFavouritesMock = {
  request: {
    query: FAVOURITE_SPORTS_SELECTOR_CONTEXT,
  },
  result: {
    data: withFavouritesResult,
  },
};

export const noFavouritesMock = {
  request: {
    query: FAVOURITE_SPORTS_SELECTOR_CONTEXT,
  },
  result: {
    data: noFavouritesResult,
  },
};
