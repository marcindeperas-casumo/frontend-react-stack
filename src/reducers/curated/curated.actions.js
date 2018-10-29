import { CURATED_SLUG } from "Reducers/curated";
import { types as cmsTypes } from "Reducers/cms";

export const fetchCurated = () => ({
  type: cmsTypes.FETCH_PAGE_BY_SLUG,
  slug: CURATED_SLUG,
});
