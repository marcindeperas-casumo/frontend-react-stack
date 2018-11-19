import { CURATED_SLUG } from "Models/curated";

export const getCuratedByMarketSlug = market =>
  `${CURATED_SLUG}.${CURATED_SLUG}-${market}`;
