import { omitSlugBasepath } from "./cms.utils";

describe("Reducers/CMS/Utils", () => {
  describe("omitSlugBasepath()", () => {
    test("removes the base path from a slug", () => {
      expect(omitSlugBasepath("mobile.foo-bar")).toBe("foo-bar");
      expect(omitSlugBasepath("mobile.games.foo-bar")).toBe("foo-bar");
    });

    test("does not touch the slug if it has no base path", () => {
      expect(omitSlugBasepath("foo-bar")).toBe("foo-bar");
    });
  });
});
