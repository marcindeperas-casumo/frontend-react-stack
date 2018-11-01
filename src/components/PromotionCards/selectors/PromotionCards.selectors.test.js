import { promotionsSlugSelectorFactory } from "Components/PromotionCards/selectors/PromotionCards.selectors";

describe("promotionsSlugSelectorFactory()", () => {
  test("returns an array of promotions given a page slug", () => {
    const pageObject = {
      id: "4476",
      slug: "promotions-page",
      title: "Promotions page",
      content: "test",
      attachments: [],
      custom_fields: {},
      fields: {
        critical_for_compliance: false,
        promotions: ["first-promotion", "second-promotion"],
      },
      children: [],
      childSlugs: [],
    };
    const state = { schema: { cms: { [pageObject.slug]: pageObject } } };
    const { slug } = pageObject;
    const selector = promotionsSlugSelectorFactory(slug);
    expect(selector(state)).toEqual(["first-promotion", "second-promotion"]);
  });

  test("returns an empty object if promotions does not exist", () => {
    const state = {};
    const slug = "foo";
    const selector = promotionsSlugSelectorFactory(slug);
    expect(selector(state)).toEqual([]);
  });
});
