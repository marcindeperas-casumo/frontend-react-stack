import { types as fetchTypes } from "Models/fetch";
import { types } from "./games.constants";
import { fetchGames } from "./games.api";
import GameBrowserService from "Services/GameBrowserService";

const { gamesBySlugs } = GameBrowserService;

export const initiateFetchGamesBySlugs = ({
  slugs,
  platform,
  country,
  variant,
}) => {
  return {
    type: fetchTypes.FETCH,
    name: types.FETCH_GAMES_BY_SLUGS,
    postFetch: types.FETCH_GAMES_BY_SLUGS_COMPLETE,
    asyncCall: gamesBySlugs,
    asyncCallData: { platform, country, slugs, variant },
  };
};

export const fetchTopLists = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_TOP_LISTS_START,
  asyncCallData,
  asyncCall: fetchGames,
  postFetch: types.FETCH_TOP_LISTS_COMPLETE,
});

export const fetchGamesBySlugs = slugs => ({
  slugs,
  type: types.FETCH_GAMES_BY_SLUGS_START,
});

export const launchGame = slug => ({ type: types.LAUNCH_GAME, slug });
