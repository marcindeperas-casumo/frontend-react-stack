import { types as fetchTypes } from "Models/fetch";
import { getJackpotsMustDrop } from "Api/api.jackpotsMustDrop";
import { TYPES } from "./jackpotsMustDrop.constants";

export const fetchJackpotsMustDrop = () => ({
  type: TYPES.FETCH,
});

// Tell the Fetch Saga to start fetch the must drop jackpots
export const initiateFetchJackpotsMustDrop = ({ currency }) => ({
  type: fetchTypes.FETCH,
  name: TYPES.FETCH,
  postFetch: TYPES.FETCH_COMPLETE,
  asyncCall: getJackpotsMustDrop,
  asyncCallData: { currency },
});
