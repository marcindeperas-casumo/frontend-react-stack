import { types as fetchTypes } from "Reducers/fetch";
import {
  types,
  getPageBySlug,
  getFetchTypeBySlug,
  getFetchCompleteTypeBySlug,
} from "Reducers/cms";

export const fetchPageBySlug = slug => ({
  type: types.FETCH_PAGE_BY_SLUG,
  slug,
});

export const initiateFetch = ({ slug, hash, lang }) => {
  return {
    type: fetchTypes.FETCH,
    name: getFetchTypeBySlug(slug),
    postFetch: getFetchCompleteTypeBySlug(slug),
    asyncCall: getPageBySlug,
    asyncCallData: { slug, hash, lang },
  };
};
