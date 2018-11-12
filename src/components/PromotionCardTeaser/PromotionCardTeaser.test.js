import React from "react";
import { shallow } from "enzyme";
import PromotionCardTeaser from "./PromotionCardTeaser";

describe("PromotionCardTeaser", () => {
  const data = {
    date: "30 Nov 2018 - 6 Jan 2019",
    imageSrc:
      "https://cms.casumo.com/wp-content/uploads/2018/11/promotions-bonus-cards.svg",
    title: "Boosted<br /> Reel<br /> Races",
  };
  test("should render a date", () => {
    const rendered = shallow(<PromotionCardTeaser {...data} />);
    expect(
      rendered
        .find("Text")
        .first()
        .children()
        .text()
    ).toBe(data.date);
  });

  test("should render a title", () => {
    const rendered = shallow(<PromotionCardTeaser {...data} />);
    expect(
      rendered
        .find("Text")
        .last()
        .children()
        .prop("html")
    ).toBe(data.title);
  });

  test("should render an image", () => {
    const rendered = shallow(<PromotionCardTeaser {...data} />);
    expect(rendered.find("ImageLazy").length).toBe(1);
    expect(rendered.find("ImageLazy").prop("src")).toBe(data.imageSrc);
  });
});
