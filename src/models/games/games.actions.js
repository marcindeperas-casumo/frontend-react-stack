import { types as fetchTypes } from "Models/fetch";
import { types } from "./games.constants";
import { fetchGames } from "./games.api";

export const fetchTopLists = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_TOP_LISTS_START,
  asyncCallData,
  asyncCall: fetchGames,
  postFetch: types.FETCH_TOP_LISTS_COMPLETE,
});

export const launchGame = slug => ({ type: types.LAUNCH_GAME, slug });
