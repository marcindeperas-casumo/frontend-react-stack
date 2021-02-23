import React from "react";
import { shallow } from "enzyme";
import PromotionCardTeaser from "Components/PromotionCardTeaser/PromotionCardTeaser";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";

const promotion = promotions["promotions.boosted-reelraces"];

describe("PromotionCardTeaser", () => {
  test("should render a date", () => {
    const rendered = shallow(
      <PromotionCardTeaser
        slug="promotions.boosted-reelraces"
        isFetched={true}
        badge={promotion.fields.badge}
        dates={promotion.fields.dates}
        title={promotion.fields.title}
      />
    );
    expect(
      rendered
        .find("Text")
        .first()
        .children()
        .text()
    ).toBe(promotion.fields.dates);
  });

  test("should render a title", () => {
    const rendered = shallow(
      <PromotionCardTeaser
        slug="promotions.boosted-reelraces"
        isFetched={true}
        badge={promotion.fields.badge}
        dates={promotion.fields.dates}
        title={promotion.fields.title}
      />
    );
    expect(
      rendered
        .find("Text")
        .last()
        .children()
        .text()
    ).toBe(promotion.fields.title);
  });

  test("should render an image", () => {
    const rendered = shallow(
      <PromotionCardTeaser
        slug="promotions.boosted-reelraces"
        isFetched={true}
        badge={promotion.fields.badge}
        dates={promotion.fields.dates}
        title={promotion.fields.title}
      />
    );
    expect(rendered.find("ImageLazy").length).toBe(1);
    expect(rendered.find("ImageLazy").prop("src")).toBe(promotion.fields.badge);
  });
});
