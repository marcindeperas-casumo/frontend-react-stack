import { types as fetchTypes } from "Models/fetch";
import { types, fetchCuratedGame } from "Models/curated";

describe("Models/curated/actions", () => {
  describe("fetchCuratedGame()", () => {
    test("initiates an API fetch", () => {
      const slug = "foo";

      expect(fetchCuratedGame({ slug })).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.CURATED_FETCH_GAME,
      });
    });

    test("fires a completed action when fetch finished", () => {
      const slug = "foo";

      expect(fetchCuratedGame({ slug })).toMatchObject({
        postFetch: types.CURATED_FETCH_GAME_COMPLETE,
      });
    });

    test("passes the fetcher function to the action", () => {
      const slug = "foo";
      const action = fetchCuratedGame({ slug });

      expect(typeof action.asyncCall).toBe("function");
    });

    test("passes the right parameters to the fetcher function", () => {
      const platform = "mobile";
      const country = "gb";
      const slugs = ["foo"];
      const variant = "default";
      const action = fetchCuratedGame({ platform, country, slugs, variant });

      expect(action.asyncCallData).toEqual({
        platform,
        country,
        slugs,
        variant,
      });
    });
  });
});
