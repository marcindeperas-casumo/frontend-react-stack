import { types as cmsTypes } from "Reducers/cms";
import { CURATED_SLUG, fetchCurated } from "Reducers/curated";

describe("Reducers/curated/actions", () => {
  const slug = "foo";
  const hash = "123";
  const lang = "en";

  describe("fetchCurated()", () => {
    test("should init an API fetch", () => {
      expect(fetchCurated({ hash, lang, slug })).toMatchObject({
        type: cmsTypes.FETCH_PAGE_BY_SLUG,
        slug: CURATED_SLUG,
      });
    });
  });
});
