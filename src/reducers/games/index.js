import { types as fetchTypes } from "Reducers/fetch";
import { fetchGames } from "Reducers/games/api";
export const types = {
  FETCH_TOP_LISTS_START: "GAMES/FETCH_TOP_LISTS_START",
  FETCH_TOP_LISTS_COMPLETE: "GAMES/FETCH_TOP_LISTS_COMPLETE",
  NORMALIZE_RESPONSE: "GAMES/NORMALIZE_RESPONSE",
  // TODO: we might need an error case here
};

const fetchTopLists = asyncCallData => ({
  type: fetchTypes.FETCH,
  name: types.FETCH_TOP_LISTS_START,
  asyncCallData,
  asyncCall: fetchGames,
  postFetch: types.FETCH_TOP_LISTS_COMPLETE,
});

export const actions = {
  fetchTopLists,
};
