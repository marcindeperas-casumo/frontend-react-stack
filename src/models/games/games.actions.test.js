import { types as fetchTypes } from "Models/fetch";
import { types } from "./games.constants";
import { fetchGamesBySlugs, initiateFetchGamesBySlugs } from "./games.actions";
import { getFetchGamesBySlugsCompleteType } from "./games.utils";

describe("Models/Games/Actions", () => {
  describe("initiateFetchGamesBySlugs()", () => {
    test("initiates an API fetch", () => {
      const slugs = ["foo", "bar"];

      expect(initiateFetchGamesBySlugs({ slugs })).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.FETCH_GAMES_BY_SLUGS,
      });
    });

    test("fires a completed action when fetch finished", () => {
      const slugs = ["foo", "bar"];

      expect(initiateFetchGamesBySlugs({ slugs })).toMatchObject({
        postFetch: getFetchGamesBySlugsCompleteType(slugs),
      });
    });

    test("passes the fetcher function to the action", () => {
      const slugs = ["foo", "bar"];
      const action = initiateFetchGamesBySlugs({ slugs });

      expect(typeof action.asyncCall).toBe("function");
    });

    test("passes the right parameters to the fetcher function", () => {
      const platform = "mobile";
      const country = "gb";
      const slugs = ["foo", "bar"];
      const variant = "default";
      const action = initiateFetchGamesBySlugs({
        platform,
        country,
        slugs,
        variant,
      });

      expect(action.asyncCallData).toEqual({
        platform,
        country,
        slugs,
        variant,
      });
    });
  });

  describe("fetchGamesBySlugs()", () => {
    test("returns an action with the correct type", () => {
      const ids = ["foo", "bar"];
      const action = fetchGamesBySlugs(ids);

      expect(action).toEqual({
        type: types.FETCH_GAMES_BY_SLUGS_START,
        slugs: ["foo", "bar"],
      });
    });
  });
});
