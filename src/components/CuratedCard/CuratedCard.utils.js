import * as R from "ramda";
import { EVENT_PROPS, MARKETS } from "Src/constants";

export const CURATED_SLUG_PREFIX = "curated.";

export const CURATED_TYPE = {
  GAME: "game",
  PROMOTION: "promotion",
  WELCOME_OFFER: "welcome offer",
  JP_WELCOME_OFFER: "japan welcome offer",
  SPORTS: "sports",
};

export const CURATED_URL = {
  [CURATED_TYPE.PROMOTION]: "/promotions/#promotionSlug",
  [CURATED_TYPE.WELCOME_OFFER]: "/cash/deposit",
  [CURATED_TYPE.JP_WELCOME_OFFER]: "/promotions/welcome-offer",
};

export const getIsGame = ({ type }) => type === CURATED_TYPE.GAME;
export const getIsSports = ({ type }) => type === CURATED_TYPE.SPORTS;

export const getLink = ({ type, promotionSlug, market }) => {
  const url = CURATED_URL[type] || null;
  const jpMarket = market === MARKETS.jp_ja;

  if (type === CURATED_TYPE.WELCOME_OFFER && jpMarket) {
    return CURATED_URL[CURATED_TYPE.JP_WELCOME_OFFER];
  }

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
