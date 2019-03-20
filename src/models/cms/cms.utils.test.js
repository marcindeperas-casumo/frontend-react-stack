import { getChildren, getChildrenAndParent, setSlug } from "./cms.utils";

describe("CMS Utils", () => {
  describe("getChildren()", () => {
    const children = [{ slug: "promotion-1" }, { slug: "promotion-2" }];
    const page = {
      slug: "promotions",
      children,
    };

    test("returns the children from a wordpress page object", () => {
      expect(getChildren(page)).toBeInstanceOf(Array);
      expect(getChildren(page)).toHaveLength(children.length);
    });

    test("prepends the parent slug to the slug of the children", () => {
      const [child1, child2] = getChildren(page);

      expect(child1.slug).toBe("promotions.promotion-1");
      expect(child2.slug).toBe("promotions.promotion-2");
    });

    test("removes the .* from the parent slug", () => {
      const [child1, child2] = getChildren({ slug: "promotions.*", children });

      expect(child1.slug).toBe("promotions.promotion-1");
      expect(child2.slug).toBe("promotions.promotion-2");
    });

    test("returns with an empty array if children are not defined", () => {
      expect(getChildren({ slug: "promotions.*" })).toEqual([]);
    });
  });

  describe("getChildrenAndParent()", () => {
    const children = [{ slug: "promotion-1" }, { slug: "promotion-2" }];
    const page = {
      slug: "promotions",
      children,
    };

    test("returns the children and the parent as well as an array", () => {
      expect(getChildrenAndParent(page)).toBeInstanceOf(Array);
      expect(getChildrenAndParent(page)).toHaveLength(children.length + 1);
    });

    test("removes the children from the parent object", () => {
      const pages = getChildrenAndParent(page);
      const [parent] = pages;

      expect(parent.slug).toBe("promotions");
      expect(parent.children).toEqual([]);
    });
  });

  describe("setSlug()", () => {
    test("sets the slug in the page object", () => {
      const page = { slug: "foo" };

      expect(setSlug(page, "bar").slug).toBe("bar");
    });

    test("removes .* from the slug", () => {
      const page = { slug: "foo" };
      const { slug } = setSlug(page, "promotions.*");

      expect(slug).toBe("promotions");
    });

    test("does not touch other parts of the object", () => {
      const page = { slug: "foo", prop1: "1", prop2: "2" };
      const updatedPage = setSlug(page, "bar");

      expect(updatedPage.prop1).toBe("1");
      expect(updatedPage.prop2).toBe("2");
    });
  });
});
