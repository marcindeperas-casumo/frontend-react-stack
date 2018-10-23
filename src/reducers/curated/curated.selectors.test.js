import { types, curatedSelector } from "Reducers/curated";

describe("Reducers/curated/selectors", () => {
  describe("curatedSelector()", () => {
    test("should return page object from store", () => {
      const pageObject = { slug: types.CURATED_SLUG };
      const state = { schema: { curated: pageObject } };
      const selector = curatedSelector(pageObject);

      expect(selector(state)).toEqual(pageObject);
    });

    test("should return empty object if page not fetched", () => {
      const state = {};
      const selector = curatedSelector();
      expect(selector(state)).toEqual({});
    });
  });
});
