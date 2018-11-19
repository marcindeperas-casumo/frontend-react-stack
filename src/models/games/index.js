import { types as fetchTypes } from "Models/fetch";
import { fetchGames } from "Models/games/api";
export const types = {
  FETCH_TOP_LISTS_START: "GAMES/FETCH_TOP_LISTS_START",
  FETCH_TOP_LISTS_COMPLETE: "GAMES/FETCH_TOP_LISTS_COMPLETE",
  NORMALIZE_RESPONSE: "GAMES/NORMALIZE_RESPONSE",
  // TODO: we might need an error case here
  LAUNCH_GAME: "GAMES/LAUNCH_GAME",
};

export const fetchTopLists = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_TOP_LISTS_START,
  asyncCallData,
  asyncCall: fetchGames,
  postFetch: types.FETCH_TOP_LISTS_COMPLETE,
});

export const launchGame = slug => ({ type: types.LAUNCH_GAME, slug });

export const actions = {
  fetchTopLists,
  launchGame,
};
