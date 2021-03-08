import { types as fetchTypes } from "Models/fetch";
import { types, initiateFetch, fetchPageBySlug } from "Models/cms";

describe("Models/CMS/Actions", () => {
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

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ slug: string; }' is not assign... Remove this comment to see the full error message
      expect(initiateFetch({ slug })).toMatchObject({
        type: fetchTypes.FETCH,
        name: `${types.FETCH_PAGE_BY_SLUG}-${slug}`,
      });
    });

    test("fires a completed action when fetch finished", () => {
      const slug = "foo";

      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ slug: string; }' is not assign... Remove this comment to see the full error message
      expect(initiateFetch({ slug })).toMatchObject({
        postFetch: `${types.FETCH_PAGE_BY_SLUG_COMPLETE}-${slug}`,
      });
    });

    test("passes the fetcher function to the action", () => {
      const slug = "foo";
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ slug: string; }' is not assign... Remove this comment to see the full error message
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
