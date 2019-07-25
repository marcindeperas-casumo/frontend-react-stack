import {
  getFetchTypeBySlug,
  getCms,
  getPage,
  getField,
  getFieldIfNotSuspicious,
  getFieldWithReplacements,
  isPageFetchedSelector,
  shouldFetchPage,
} from "Models/cms";

describe("CMS Selectors", () => {
  describe("getCms()", () => {
    test("returns the cms state", () => {
      const cms = { foo: "bar" };
      const state = { schema: { cms } };

      expect(getCms(state)).toEqual(cms);
    });

    test("returns an empty object if it is not defined", () => {
      const state = {};

      expect(getCms(state)).toEqual({});
    });
  });

  describe("getPage()", () => {
    test("returns a page object from the store by slug", () => {
      const pageObject = { slug: "foo" };
      const state = { schema: { cms: { [pageObject.slug]: pageObject } } };
      const selector = getPage(pageObject.slug);

      expect(selector(state)).toEqual(pageObject);
    });

    test("returns an empty object if the page is not fetched yet", () => {
      const state = {};
      const slug = "foo";
      const selector = getPage(slug);

      expect(selector(state)).toEqual({});
    });
  });

  describe("isPageFetchedSelector()", () => {
    test("returns TRUE if the page has been fetched", () => {
      const slug = "foo";
      const state = {
        schema: {
          cms: {
            [slug]: {},
          },
        },
      };

      expect(isPageFetchedSelector(slug)(state)).toBe(true);
    });

    test("returns FALSE if the page is not started to be fetched yet", () => {
      const slug = "foo";
      const state = { fetch: {} };

      expect(isPageFetchedSelector(slug)(state)).toBe(false);
    });
  });

  describe("shouldFetchPage()", () => {
    test("returns TRUE if the page was not started to be fetched yet", () => {
      const page = { slug: "foo" };
      const state = { fetch: {}, schema: {} };
      const selector = shouldFetchPage(page.slug);

      expect(selector(state)).toBe(true);
    });

    test("returns FALSE if the page is already started to be fetched", () => {
      const page = { slug: "foo" };
      const state = { fetch: { [getFetchTypeBySlug(page.slug)]: {} } };
      const selector = shouldFetchPage(page.slug);

      expect(selector(state)).toBe(false);
    });

    test("returns FALSE if the page is in the store but not in the fetch history", () => {
      const slug = "foo";
      const state = { schema: { cms: { [slug]: {} } } };

      expect(shouldFetchPage(slug)(state)).toBe(false);
    });

    test("returns FALSE if the page is in the store and in the fetch history", () => {
      const slug = "foo";
      const state = {
        fetch: { [getFetchTypeBySlug(slug)]: {} },
        schema: { cms: { [slug]: {} } },
      };

      expect(shouldFetchPage(slug)(state)).toBe(false);
    });
  });

  describe("getField()", () => {
    test("returns a field by the page-slug and the field-name", () => {
      const pageObject = { slug: "foo", fields: { foobar: "bar" } };
      const state = { schema: { cms: { [pageObject.slug]: pageObject } } };
      const { slug } = pageObject;
      const selector = getField({ slug, field: "foobar" });

      expect(selector(state)).toEqual("bar");
    });

    test("returns NULL if the page or the field does not exist", () => {
      const state = {};
      const slug = "foo";
      const field = "foobar";
      const selector = getField({ slug, field });

      expect(selector(state)).toEqual(null);
    });

    test("returns the defaultValue if specified if field/page not found", () => {
      const state = {};
      const slug = "foo";
      const field = "foobar";
      const defaultValue = "Alaska";
      const selector = getField({ slug, field, defaultValue });

      expect(selector(state)).toEqual(defaultValue);
    });
  });

  describe("getFieldIfNotSuspicious()", () => {
    test("returns a field by the page-slug and the field-name if not suspicious", () => {
      const pageObject = { slug: "foo", fields: { foobar: "bar" } };
      const state = {
        schema: { cms: { [pageObject.slug]: pageObject } },
        handshake: {
          app: {
            "common/composition/session": { id: "p1" },
            "common/composition/players": {
              players: { p1: { id: "p1", suspiciousAccount: false } },
            },
          },
        },
      };
      const { slug } = pageObject;
      const selector = getFieldIfNotSuspicious({ slug, field: "foobar" });

      expect(selector(state)).toEqual("bar");
    });

    test("returns NULL if suspicious account is flagged", () => {
      const pageObject = { slug: "foo", fields: { foobar: "bar" } };
      const state = {
        schema: { cms: { [pageObject.slug]: pageObject } },
        handshake: {
          app: {
            "common/composition/session": { id: "p1" },
            "common/composition/players": {
              players: { p1: { id: "p1", suspiciousAccount: true } },
            },
          },
        },
      };
      const slug = "foo";
      const field = "foobar";
      const selector = getFieldIfNotSuspicious({ slug, field });

      expect(selector(state)).toEqual(null);
    });

    test("returns the defaultValue if specified and if suspicious account", () => {
      const pageObject = { slug: "foo", fields: { foobar: "bar" } };
      const state = {
        schema: { cms: { [pageObject.slug]: pageObject } },
        handshake: {
          app: {
            "common/composition/session": { id: "p1" },
            "common/composition/players": {
              players: { p1: { id: "p1", suspiciousAccount: true } },
            },
          },
        },
      };
      const slug = "foo";
      const field = "foobar";
      const defaultValue = "Alaska";
      const selector = getFieldIfNotSuspicious({ slug, field, defaultValue });

      expect(selector(state)).toEqual(defaultValue);
    });
  });

  describe("getFieldWithReplacements()", () => {
    test("should return field with replacements", () => {
      const pageObject = { slug: "foo", fields: { foobar: "I am a {{var}}" } };
      const state = { schema: { cms: { [pageObject.slug]: pageObject } } };
      const { slug } = pageObject;
      const replacements = { var: "variable" };
      const selector = getFieldWithReplacements({ slug, field: "foobar" })(
        replacements
      );

      expect(selector(state)).toEqual("I am a variable");
    });
  });
});
