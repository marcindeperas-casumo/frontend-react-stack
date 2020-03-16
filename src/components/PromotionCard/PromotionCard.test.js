import React from "react";
import { shallow } from "enzyme";
import Card from "@casumo/cmp-card";
import { PromotionCard } from "Components/PromotionCard/PromotionCard";
import { PromotionCardHeader } from "Components/PromotionCard/PromotionCardHeader";
const promotion = {
  id: "promotion",
  slug: "/promotion-1",
  image: "/image.jpg",
  badge: "/badge.jpg",
  title: "i-am-title",
  subtitle: "i-am-the-subtitle",
};

describe("PromotionCard", () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<PromotionCard promotion={promotion} />);
  });

  test("should render PromotionCardHeader component", () => {
    expect(
      rendered
        .find(Card)
        .dive()
        .find(PromotionCardHeader)
        .exists()
    ).toBe(true);

    const renderedPromotionCardHeaderProps = rendered
      .find("Card")
      .dive()
      .find("PromotionCardHeader")
      .props();

    expect(renderedPromotionCardHeaderProps.badge).toBe(promotion.badge);
  });

  test("should render PromotionCardContent component", () => {
    expect(
      rendered
        .find("Card")
        .dive()
        .find("PromotionCardContent")
        .exists()
    ).toBe(true);
  });

  test("should render PromotionCardImage component", () => {
    expect(
      rendered
        .find("Card")
        .dive()
        .find("PromotionCardImage")
        .exists()
    ).toBe(true);

    const renderedPromotionCardImageProps = rendered
      .find("Card")
      .dive()
      .find("PromotionCardImage")
      .props();

    expect(renderedPromotionCardImageProps.image).toBe(promotion.image);
  });
});
