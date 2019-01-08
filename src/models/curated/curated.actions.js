import { types } from "Models/curated";
import { types as fetchTypes } from "Models/fetch";
import GameBrowserService from "Services/GameBrowserService";

const { gamesBySlugs } = GameBrowserService;

export const fetchCuratedGame = ({ variant = "default", slugs }) => {
  return {
    type: fetchTypes.FETCH,
    name: types.CURATED_FETCH_GAME,
    postFetch: types.CURATED_FETCH_GAME_COMPLETE,
    asyncCall: gamesBySlugs,
    asyncCallData: { variant, slugs },
  };
};
