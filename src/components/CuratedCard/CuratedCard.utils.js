import * as R from "ramda";
import { EVENT_PROPS } from "Src/constants";

export const CURATED_SLUG_PREFIX = "curated.";

export const CURATED_TYPE = {
  GAME: "game",
  PROMOTION: "promotion",
  WELCOME_OFFER: "welcome offer",
};

export const CURATED_URL = {
  [CURATED_TYPE.PROMOTION]: "/en/promotions/#promotionSlug",
  [CURATED_TYPE.WELCOME_OFFER]: "/en/cash/deposit",
};

export const getIsGame = ({ type }) => type === CURATED_TYPE.GAME;

export const getLink = ({ type, promotionSlug }) => {
  const url = CURATED_URL[type] || null;

  if (type === CURATED_TYPE.PROMOTION) {
    return R.replace("#promotionSlug", promotionSlug, url);
  }

  return url;
};

export const prefixCuratedSlug = slug => {
  const isString = typeof slug === "string";
  const isPrefixed = isString && R.startsWith(CURATED_SLUG_PREFIX, slug);

  if (!isString) {
    return "";
  }

  if (!isPrefixed) {
    return `${CURATED_SLUG_PREFIX}${slug}`;
  }

  return slug;
};

export const getTrackData = ({ type, slug }) => ({
  [EVENT_PROPS.CURATED_TYPE]: type,
  [EVENT_PROPS.CURATED_SLUG]: prefixCuratedSlug(slug),
});
