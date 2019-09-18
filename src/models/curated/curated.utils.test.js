import { types } from "Models/cms";
import { CURATED_SLUG } from "./curated.constants";
import { prefixCuratedSlug, takeFetchedCuratedPages } from "./curated.utils";

describe("Models/curated/utils", () => {
  describe("prefixCuratedSlug()", () => {
    test("prepends the base-page slug to the slug if it is not prepended yet", () => {
      expect(prefixCuratedSlug("foo")).toEqual(`${CURATED_SLUG}.foo`);
    });

    test("does not prepend the base-page slug if the slug already has it", () => {
      expect(prefixCuratedSlug(`${CURATED_SLUG}.foo`)).toEqual(
        `${CURATED_SLUG}.foo`
      );
    });

    test("returns an empty string if is not a string", () => {
      expect(prefixCuratedSlug(null)).toEqual("");
      expect(prefixCuratedSlug(false)).toEqual("");
      expect(prefixCuratedSlug()).toEqual("");
    });
  });

  describe("takeFetchedCuratedPages()", () => {
    test("returns TRUE if the action means that a curated page has been fetched", () => {
      const action = {
        type: `${types.FETCH_PAGE_BY_SLUG_COMPLETE}-${CURATED_SLUG}.foo`,
      };
      expect(takeFetchedCuratedPages(action)).toBe(true);
    });

    test("returns FALSE otherwise", () => {
      const action = {
        type: "foo-bar",
      };
      expect(takeFetchedCuratedPages(action)).toBe(false);
    });
  });
});
