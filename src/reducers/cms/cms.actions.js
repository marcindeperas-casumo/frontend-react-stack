import { types as fetchTypes } from "Reducers/fetch";
import { getPageBySlug } from "./cms.api";
import { types } from "./cms.constants";
import { getFetchTypeBySlug, getFetchCompleteTypeBySlug } from "./cms.utils";

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
