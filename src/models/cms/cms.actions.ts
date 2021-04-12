import { getPageBySlug } from "Api/api.cms";
import { types as fetchTypes } from "Models/fetch";
import {
  types,
  getFetchTypeBySlug,
  getFetchCompleteTypeBySlug,
} from "Models/cms";

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
