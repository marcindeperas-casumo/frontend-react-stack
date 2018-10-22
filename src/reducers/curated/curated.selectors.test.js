import {
  types,
  curatedSelector,
  isPageLoadedFactory,
  isPageFetchedFactory,
  shouldFetchPageFactory,
} from "Reducers/curated";

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

  describe("isPageLoadedFactory()", () => {
    test("should return TRUE if page is in store", () => {
      const pageObject = { slug: types.CURATED_SLUG };
      const state = { schema: { curated: pageObject } };
      const selector = isPageLoadedFactory(pageObject);

      expect(selector(state)).toBe(true);
    });

    test("should return FALSE if page not fetched", () => {
      const state = {};
      const pageObject = { slug: types.CURATED_SLUG };
      const selector = isPageLoadedFactory(pageObject);

      expect(selector(state)).toBe(false);
    });
  });

  describe("isPageFetchedFactory()", () => {
    test("should return TRUE if page fetching", () => {
      const page = { slug: types.CURATED_SLUG };
      const state = { fetch: { [types.CURATED_FETCH_PAGE]: {} } };
      const selector = isPageFetchedFactory(page.slug);

      expect(selector(state)).toBe(true);
    });

    test("should return FALSE if page not fetching", () => {
      const page = { slug: types.CURATED_SLUG };
      const state = { fetch: {} };
      const selector = isPageFetchedFactory(page.slug);

      expect(selector(state)).toBe(false);
    });
  });

  describe("shouldFetchPageFactory()", () => {
    test("should return TRUE if page not fetched and not in state", () => {
      const page = { slug: types.CURATED_SLUG };
      const state = { fetch: {}, schema: {} };
      const selector = shouldFetchPageFactory();

      expect(selector(state)).toBe(true);
    });

    test("should return FALSE if page is being fetched", () => {
      const page = { slug: types.CURATED_SLUG };
      const state = { fetch: { [types.CURATED_FETCH_PAGE]: {} } };
      const selector = shouldFetchPageFactory();

      expect(selector(state)).toBe(false);
    });

    test("should return FALSE if page is in state", () => {
      const page = { slug: types.CURATED_SLUG };
      const state = {
        fetch: {},
        schema: { curated: page },
      };
      const selector = shouldFetchPageFactory(page);

      expect(selector(state)).toBe(false);
    });
  });
});
