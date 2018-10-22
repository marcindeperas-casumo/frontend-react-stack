import { types as fetchTypes } from "Reducers/fetch";
import { types } from "Reducers/curated";

export const fetchPage = () => ({
  type: types.CURATED_FETCH_PAGE,
  slug: types.CURATED_SLUG,
});

export const initFetch = () => {
  return {
    type: fetchTypes.FETCH,
    name: types.CURATED_FETCH_PAGE,
    postFetch: types.CURATED_FETCH_PAGE_COMPLETE,
    asyncCall: fetchPage,
  };
};
