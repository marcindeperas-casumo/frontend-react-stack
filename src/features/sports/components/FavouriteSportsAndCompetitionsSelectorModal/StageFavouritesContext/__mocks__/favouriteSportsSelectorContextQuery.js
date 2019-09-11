// @flow

import { FAVOURITE_SPORTS_SELECTOR_CONTEXT, PLAYER_VERTICAL_QUERY } from "../StageFavouritesProvider";
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

export const PlayerVerticalSportsMock = {
  request: {
    query: PLAYER_VERTICAL_QUERY,
  },
  result: {
    data: {
      player: {
        __typename: "Player",
        vertical: 'SPORTS'
      }
    }
  },
};

export const PlayerVerticalCasinoMock = {
  request: {
    query: PLAYER_VERTICAL_QUERY,
  },
  result: {
    data: {
      player: {
        __typename: "Player",
        vertical: 'CASINO'
      }
    }
  },
};
