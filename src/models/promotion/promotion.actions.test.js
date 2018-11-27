import { types as fetchTypes } from "Models/fetch";
import { types, fetchGamesById, fetchPromotionGames } from "Models/promotion";

describe("Models/promotion/actions", () => {
  describe("fetchGamesById()", () => {
    test("initiates an API fetch", () => {
      const slugs = ["foo", "bar"];

      expect(fetchGamesById(slugs)).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.PROMOTION_FETCH_GAMES,
      });
    });

    test("fires a completed action when fetch finished", () => {
      const slugs = ["foo", "bar"];

      expect(fetchGamesById(slugs)).toMatchObject({
        postFetch: types.PROMOTION_FETCH_GAMES_COMPLETE,
      });
    });

    test("passes the fetcher function to the action", () => {
      const slugs = ["foo", "bar"];
      const action = fetchGamesById(slugs);

      expect(typeof action.asyncCall).toBe("function");
    });

    test("passes the right parameters to the fetcher function", () => {
      const platform = "mobile";
      const country = "gb";
      const slugs = ["foo", "bar"];
      const variant = "default";
      const action = fetchGamesById({ platform, country, slugs, variant });

      expect(action.asyncCallData).toEqual({
        platform,
        country,
        slugs,
        variant,
      });
    });

    test("fetchPromotionGames: should return an action", () => {
      const ids = ["foo", "bar"];
      const action = fetchPromotionGames(ids);

      expect(action).toEqual({
        type: types.PROMOTION_SHOULD_FETCH_GAMES,
        slugs: ["foo", "bar"],
      });
    });
  });
});
