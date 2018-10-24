import { types, curatedSelector } from "Reducers/curated";

describe("Reducers/curated/selectors", () => {
  describe("curatedSelector()", () => {
    test("should return empty object if page not fetched", () => {
      const state = { schema: { cms: "page", game: "game" } };
      const selector = curatedSelector(state);

      expect(selector(state)).toEqual({});
    });
  });
});
