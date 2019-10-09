import { types as fetchTypes } from "Models/fetch";
import { fetchGames } from "Api/api.games";
import { getGamesBySlugs } from "Api/api.gamebrowser";
import { getCasinoPlayerGames } from "Api/api.casinoPlayerGames";
import { types } from "./games.constants";
import { getFetchGamesBySlugsCompleteType } from "./games.utils";

export const initiateFetchGamesBySlugs = ({
  slugs,
  platform,
  country,
  variant,
}) => {
  return {
    type: fetchTypes.FETCH,
    name: types.FETCH_GAMES_BY_SLUGS,
    postFetch: getFetchGamesBySlugsCompleteType(slugs),
    asyncCall: getGamesBySlugs,
    asyncCallData: { platform, country, slugs, variant },
  };
};

export const initiateFetchGamesByProvider = ({
  provider,
  sessionId,
  pageSize = 50,
  page,
}) => {
  return {
    type: fetchTypes.FETCH,
    name: types.FETCH_GAMES_BY_PROVIDER,
    postFetch: types.FETCH_GAMES_BY_PROVIDER_COMPLETE,
    asyncCall: getCasinoPlayerGames,
    asyncCallData: { providers: [provider], sessionId, pageSize, page },
  };
};

export const initFetchTopLists = () => ({
  type: types.INIT_FETCH_GAME_LISTS,
});

export const fetchTopLists = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_TOP_LISTS_START,
  asyncCallData,
  asyncCall: fetchGames,
  postFetch: types.FETCH_TOP_LISTS_COMPLETE,
});

export const updateMyList = gameSlug => ({
  type: types.UPDATE_MY_LIST,
  gameSlug,
});

export const fetchGamesBySlugs = slugs => ({
  slugs,
  type: types.FETCH_GAMES_BY_SLUGS_START,
});

export const launchGame = slug => ({ type: types.LAUNCH_GAME, slug });

export const fetchGamesByProvider = (provider, page, pageSize) => ({
  provider,
  page,
  pageSize,
  type: types.FETCH_GAMES_BY_PROVIDER_START,
});
