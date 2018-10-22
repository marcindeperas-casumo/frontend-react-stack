import { types as fetchTypes } from "Reducers/fetch";
import { types, initFetch, fetchPage } from "Reducers/curated";

describe("Reducers/curated/actions", () => {
  describe("fetchPage()", () => {
    test("should append the slug to type", () => {
      const action = fetchPage();

      expect(action).toEqual({
        type: types.CURATED_FETCH_PAGE,
        slug: types.CURATED_SLUG,
      });
    });
  });

  describe("initFetch()", () => {
    test("should init an API fetch", () => {
      expect(initFetch()).toMatchObject({
        type: fetchTypes.FETCH,
        name: types.CURATED_FETCH_PAGE,
      });
    });

    test("should fire completed action when fetch finished", () => {
      expect(initFetch()).toMatchObject({
        postFetch: types.CURATED_FETCH_PAGE_COMPLETE,
      });
    });

    test("shoud pass fetch function to action", () => {
      const action = initFetch();

      expect(typeof action.asyncCall).toBe("function");
    });
  });
});
