import React from "react";
import { shallow } from "enzyme";
import PromotionTitle from "Components/PromotionTitle";

describe("PromotionTitle", () => {
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
    const rendered = shallow(<PromotionTitle {...mockPromotionWithBadge} />);
    expect(rendered.find("PromotionTitleTextWithBadge").length).toBe(1);
    expect(rendered.find("PromotionTitleText").length).toBe(0);
  });

  test("render a div if there isn't a badge", () => {
    const rendered = shallow(<PromotionTitle {...mockPromotion} />);
    expect(rendered.find("PromotionTitleTextWithBadge").length).toBe(0);
    expect(rendered.find("PromotionTitleText").length).toBe(1);
  });
});
