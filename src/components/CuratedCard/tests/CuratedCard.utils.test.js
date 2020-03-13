import { prefixCuratedSlug, CURATED_SLUG_PREFIX } from "../CuratedCard.utils";

describe("CuratedCard/Utils", () => {
  describe("prefixCuratedSlug()", () => {
    test("prepends the base-page slug to the slug if it is not prepended yet", () => {
      expect(prefixCuratedSlug("foo")).toEqual(`${CURATED_SLUG_PREFIX}foo`);
    });

    test("prepends the base-slug if the slug starts with the base-slug, but without a dot", () => {
      expect(prefixCuratedSlug(`curated-foo`)).toEqual(
        `${CURATED_SLUG_PREFIX}curated-foo`
      );
    });

    test("does not prepend the base-page slug if the slug already has it", () => {
      expect(prefixCuratedSlug(`${CURATED_SLUG_PREFIX}foo`)).toEqual(
        `${CURATED_SLUG_PREFIX}foo`
      );
    });

    test("returns an empty string if is not a string", () => {
      expect(prefixCuratedSlug(null)).toEqual("");
      expect(prefixCuratedSlug(false)).toEqual("");
      expect(prefixCuratedSlug()).toEqual("");
    });
  });
});
