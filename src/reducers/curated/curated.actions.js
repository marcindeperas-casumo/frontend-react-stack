import { types, CURATED_SLUG } from "Reducers/curated";
import { types as cmsTypes } from "Reducers/cms";
import { types as fetchTypes } from "Reducers/fetch";
import GameBrowserService from "Services/GameBrowserService";

const { gamesBySlugs } = GameBrowserService;

export const fetchCurated = () => ({
  type: cmsTypes.FETCH_PAGE_BY_SLUG,
  slug: CURATED_SLUG,
});

export const fetchCuratedGame = ({ platform, country, slugs, variant }) => {
  return {
    type: fetchTypes.FETCH,
    name: types.CURATED_FETCH_GAME,
    postFetch: types.CURATED_FETCH_GAME_COMPLETE,
    asyncCall: gamesBySlugs,
    asyncCallData: { platform, country, slugs, variant },
  };
};
