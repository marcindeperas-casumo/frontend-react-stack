import React from "react";
import { shallow } from "enzyme";
import { PromotionTeaserRow } from "Components/PromotionTeaserRow/PromotionTeaserRow";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";

const promotion = promotions["promotions.boosted-reelraces"];

describe("PromotionTeaserRow", () => {
  test("should render a date", () => {
    const rendered = shallow(
      <PromotionTeaserRow
        slug="promotions.boosted-reelraces"
        dates={promotion.fields.dates}
        title={promotion.fields.title}
      />
    );
    expect(
      rendered
        .find({ "data-test": "promotion-dates" })
        .dive()
        .text()
    ).toBe(promotion.fields.dates);
  });

  test("should render a title", () => {
    const rendered = shallow(
      <PromotionTeaserRow
        slug="promotions.boosted-reelraces"
        dates={promotion.fields.dates}
        title={promotion.fields.title}
      />
    );
    expect(
      rendered
        .find({ "data-test": "promotion-title" })
        .dive()
        .text()
    ).toBe(promotion.fields.title);
  });
});
