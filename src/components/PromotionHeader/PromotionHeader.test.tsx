import React from "react";
import { mount } from "enzyme";
import PromotionHeader from "Components/PromotionHeader";

describe("PromotionHeader", () => {
  const mockPromotion = {
    dates: "Ends on 6th january 2019",
    title: "Winter Games",
  };
  const mockPromotionWithBadge = {
    ...mockPromotion,
    badge:
      "https://cms.casumo.com/wp-content/uploads/2018/11/winter-games-emblem.svg",
  };

  test("render a Media component if there is a badge", () => {
    const rendered = mount(<PromotionHeader {...mockPromotionWithBadge} />);
    expect(
      rendered.children().find("PromotionHeaderTextWithBadge").length
    ).toBe(1);
    expect(rendered.children().find("PromotionHeaderText").length).toBe(0);
  });

  test("render a div if there isn't a badge", () => {
    const rendered = mount(<PromotionHeader {...mockPromotion} />);
    expect(
      rendered.children().find("PromotionHeaderTextWithBadge").length
    ).toBe(0);
    expect(rendered.children().find("PromotionHeaderText").length).toBe(1);
  });
});
