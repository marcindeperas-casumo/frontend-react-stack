import { types, getCuratedByMarketSlug } from "Models/curated";
import { fetchPageBySlug } from "Models/cms";
import { types as fetchTypes } from "Models/fetch";
import GameBrowserService from "Services/GameBrowserService";
import { market as marketSelector } from "Models/handshake/selectors";

const { gamesBySlugs } = GameBrowserService;

export function fetchCurated() {
  return (dispatch, getState) => {
    const market = marketSelector(getState());
    const slug = getCuratedByMarketSlug(market);
    dispatch(fetchPageBySlug(slug));
  };
}

export const fetchCuratedGame = ({ platform, country, slugs, variant }) => {
  return {
    type: fetchTypes.FETCH,
    name: types.CURATED_FETCH_GAME,
    postFetch: types.CURATED_FETCH_GAME_COMPLETE,
    asyncCall: gamesBySlugs,
    asyncCallData: { platform, country, slugs, variant },
  };
};
