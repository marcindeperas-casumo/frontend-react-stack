import { CURATED_SLUG } from "Reducers/curated";

export const getCuratedByMarketSlug = market =>
  `${CURATED_SLUG}.${CURATED_SLUG}-${market}`;
