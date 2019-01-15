import { types } from "Models/curated";
import { types as fetchTypes } from "Models/fetch";
import { getGamesBySlugs } from "Api/api.gamebrowser";

export const fetchCuratedGame = ({
  platform,
  country,
  variant = "default",
  slugs,
}) => {
  return {
    type: fetchTypes.FETCH,
    name: types.CURATED_FETCH_GAME,
    postFetch: types.CURATED_FETCH_GAME_COMPLETE,
    asyncCall: getGamesBySlugs,
    asyncCallData: { platform, country, variant, slugs },
  };
};
