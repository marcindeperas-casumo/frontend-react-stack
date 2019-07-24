export const types = {
  CURATED_FETCH_GAME: "CURATED/FETCH_GAME",
  CURATED_FETCH_GAME_COMPLETE: "CURATED/FETCH_GAME_COMPLETE",
  LAUNCH_THEM_GAMES: "PROMOTIONS/FETCH_GAMES",
};

export const CURATED_SLUG = "curated";
export const WELCOME_OFFER_CARD = "welcome-offer-test";

export const CURATED_TYPE = {
  GAME: "game",
  PROMOTION: "promotion",
  WELCOME_OFFER: "welcome offer",
};

export const CARD_CLICK_URL = {
  [CURATED_TYPE.PROMOTION]: "/en/promotions/#promotionSlug",
  [CURATED_TYPE.WELCOME_OFFER]: "/en/cash/deposit",
};
