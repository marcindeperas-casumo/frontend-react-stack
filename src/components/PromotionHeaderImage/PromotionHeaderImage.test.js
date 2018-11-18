import React from "react";
import { shallow } from "enzyme";
import PromotionHeaderImage from "Components/PromotionHeaderImage";

describe("PromotionHeaderImage", () => {
  test("should not render a badge if one isn't passed in", () => {
    const rendered = shallow(<PromotionHeaderImage image="/a.jpg" />);
    expect(rendered.find("Flex").length).toBe(0);
  });
  test("should render a badge if one is passed in", () => {
    const rendered = shallow(
      <PromotionHeaderImage image="/a.jpg" badge="/b.jpg" />
    );
    expect(rendered.find("Flex").length).toBe(1);
  });
  test("should render an img if an svg badge is passed in", () => {
    const rendered = shallow(
      <PromotionHeaderImage image="/a.jpg" badge="/b.svg" />
    );
    expect(rendered.find("img").length).toBe(1);
    expect(rendered.find("ImageLazy").length).toBe(1);
  });
  test("should render an ImageLazy if a rasterised badge is passed in", () => {
    const rendered = shallow(
      <PromotionHeaderImage image="/a.jpg" badge="/b.jpg" />
    );
    expect(rendered.find("img").length).toBe(0);
    expect(rendered.find("ImageLazy").length).toBe(2);
  });
});
