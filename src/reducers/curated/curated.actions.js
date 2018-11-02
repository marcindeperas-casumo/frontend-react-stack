import { types, CURATED_SLUG } from "Reducers/curated";
import { fetchPageBySlug } from "Reducers/cms";
import { types as fetchTypes } from "Reducers/fetch";
import GameBrowserService from "Services/GameBrowserService";
import { market as marketSelector } from "Reducers/handshake/selectors";

const { gamesBySlugs } = GameBrowserService;

export function fetchCurated() {
  return (dispatch, getState) => {
    const slug = `${CURATED_SLUG}.${marketSelector(getState())}`;
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
