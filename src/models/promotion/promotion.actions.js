import { types } from "Models/promotion";
import { types as fetchTypes } from "Models/fetch";
import GameBrowserService from "Services/GameBrowserService";

const { gamesBySlugs } = GameBrowserService;

export const fetchGamesById = ({ platform, country, slugs, variant }) => {
  return {
    type: fetchTypes.FETCH,
    name: types.PROMOTION_FETCH_GAMES,
    postFetch: types.PROMOTION_FETCH_GAMES_COMPLETE,
    asyncCall: gamesBySlugs,
    asyncCallData: { platform, country, slugs, variant },
  };
};

export const fetchPromotionGames = ids => ({
  type: types.PROMOTION_SHOULD_FETCH_GAMES,
  slugs: ids,
});
