import { types as fetchTypes } from "Reducers/fetch";
import { types } from "./cms.constants";
import { initiateFetch, fetchPageBySlug } from "./cms.actions";

describe("Reducers/CMS/Actions", () => {
  describe("fetchPageBySlug()", () => {
    test("appends the slug to the type", () => {
      const slug = "foo";
      const action = fetchPageBySlug(slug);

      expect(action).toEqual({
        type: types.FETCH_PAGE_BY_SLUG,
        slug: "foo",
      });
    });
  });

  describe("initiateFetch()", () => {
    test("initiates an API fetch", () => {
      const slug = "foo";

      expect(initiateFetch({ slug })).toMatchObject({
        type: fetchTypes.FETCH,
        name: `${types.FETCH_PAGE_BY_SLUG}-${slug}`,
      });
    });

    test("fires a completed action when fetch finished", () => {
      const slug = "foo";

      expect(initiateFetch({ slug })).toMatchObject({
        postFetch: `${types.FETCH_PAGE_BY_SLUG_COMPLETE}-${slug}`,
      });
    });

    test("passes the fetcher function to the action", () => {
      const slug = "foo";
      const action = initiateFetch({ slug });

      expect(typeof action.asyncCall).toBe("function");
    });

    test("passes the right parameters to the fetcher function", () => {
      const slug = "foo";
      const hash = "123";
      const lang = "en";
      const action = initiateFetch({ slug, hash, lang });

      expect(action.asyncCallData).toEqual({ slug, hash, lang });
    });
  });
});
