import {
  slugSelectorFactory,
  fieldSelectorFactory,
  isPageLoadedFactory,
  isPageFetchedFactory,
  shouldFetchPageFactory,
} from "./cms.selectors";
import { getFetchTypeBySlug } from "./cms.utils";

describe("CMS Selectors", () => {
  describe("Slug Selector", () => {
    test("returns a page object from the store by slug", () => {
      const pageObject = { slug: "foo" };
      const state = { schema: { cms: { [pageObject.slug]: pageObject } } };
      const selector = slugSelectorFactory(pageObject.slug);

      expect(selector(state)).toEqual(pageObject);
    });

    test("returns an empty object if the page is not fetched yet", () => {
      const state = {};
      const slug = "foo";
      const selector = slugSelectorFactory(slug);

      expect(selector(state)).toEqual({});
    });

    test("returns the correct page object even if the slug contains a base path", () => {
      const pageObject = { slug: "foo" };
      const state = { schema: { cms: { [pageObject.slug]: pageObject } } };
      const selector = slugSelectorFactory(`mobile.${pageObject.slug}`);

      expect(selector(state)).toEqual(pageObject);
    });
  });

  describe("isPageLoadedFactory()", () => {
    test("returns TRUE if the page is found in the store", () => {
      const pageObject = { slug: "foo" };
      const state = { schema: { cms: { [pageObject.slug]: pageObject } } };
      const selector = isPageLoadedFactory(pageObject.slug);
      const selectorWithBasepath = isPageLoadedFactory(
        `mobile.${pageObject.slug}`
      );

      expect(selector(state)).toBe(true);
      expect(selectorWithBasepath(state)).toBe(true);
    });

    test("returns FALSE if the page is not fetched yet", () => {
      const state = {};
      const slug = "foo";
      const selector = isPageLoadedFactory(slug);

      expect(selector(state)).toBe(false);
    });
  });

  describe("isPageFetchedFactory()", () => {
    test("returns TRUE if the page is started to be fetched", () => {
      const page = { slug: "foo" };
      const state = { fetch: { [getFetchTypeBySlug(page.slug)]: {} } };
      const selector = isPageFetchedFactory(page.slug);
      const selectorWithBasepath = isPageFetchedFactory(`mobile.${page.slug}`);

      expect(selector(state)).toBe(true);
      expect(selectorWithBasepath(state)).toBe(true);
    });

    test("returns FALSE if the page is not started to be fetched yet", () => {
      const page = { slug: "foo" };
      const state = { fetch: {} };
      const selector = isPageFetchedFactory(page.slug);

      expect(selector(state)).toBe(false);
    });
  });

  describe("shouldFetchPageFactory()", () => {
    test("returns TRUE if the page is not fetched yet and is not in the state", () => {
      const page = { slug: "foo" };
      const state = { fetch: {}, schema: {} };
      const selector = shouldFetchPageFactory(page.slug);
      const selectorWithBasepath = shouldFetchPageFactory(
        `mobile.${page.slug}`
      );

      expect(selector(state)).toBe(true);
      expect(selectorWithBasepath(state)).toBe(true);
    });

    test("returns FALSE if the page is already being fetched", () => {
      const page = { slug: "foo" };
      const state = { fetch: { [getFetchTypeBySlug(page.slug)]: {} } };
      const selector = shouldFetchPageFactory(page.slug);

      expect(selector(state)).toBe(false);
    });

    test("returns FALSE if the page is already in the state", () => {
      const page = { slug: "foo" };
      const state = {
        fetch: {},
        schema: { cms: { [page.slug]: page } },
      };
      const selector = shouldFetchPageFactory(page.slug);

      expect(selector(state)).toBe(false);
    });
  });

  describe("fieldSelectorFactory()", () => {
    test("returns a field by the page-slug and the field-name", () => {
      const pageObject = { slug: "foo", fields: { foobar: "bar" } };
      const state = { schema: { cms: { [pageObject.slug]: pageObject } } };
      const { slug } = pageObject;
      const selector = fieldSelectorFactory({ slug, field: "foobar" });
      const selectorWithBasepath = fieldSelectorFactory({
        slug: `mobile.${slug}`,
        field: "foobar",
      });

      expect(selector(state)).toEqual("bar");
      expect(selectorWithBasepath(state)).toEqual("bar");
    });

    test("returns the field-name if the page or the field does not exist", () => {
      const state = {};
      const slug = "foo";
      const field = "foobar";
      const selector = fieldSelectorFactory({ slug, field });

      expect(selector(state)).toEqual(field);
    });
  });
});
