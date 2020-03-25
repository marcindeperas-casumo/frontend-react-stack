import { CURATED_SLUG } from "./curated.constants";
import { prefixCuratedSlug } from "./curated.utils";

describe("Models/curated/utils", () => {
  describe("prefixCuratedSlug()", () => {
    test("prepends the base-page slug to the slug if it is not prepended yet", () => {
      expect(prefixCuratedSlug("foo")).toEqual(`${CURATED_SLUG}.foo`);
    });

    test("prepends the base-slug if the slug starts with the base-slug, but without a dot", () => {
      expect(prefixCuratedSlug(`${CURATED_SLUG}-foo`)).toEqual(
        `${CURATED_SLUG}.${CURATED_SLUG}-foo`
      );
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
});
