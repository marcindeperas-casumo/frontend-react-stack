import React from "react";
import { shallow } from "enzyme";
import ImageAdaptive from "Components/Image/ImageAdaptive";
import ImageResponsive from "Components/Image/ImageResponsive";
import ImageLazy from "Components/Image/ImageLazy";
import imageData from "./__mocks__/image.json";

describe("ImageLazy", () => {
  const images = imageData.images;

  test("should render ImageAdaptive if passed images", () => {
    const component = shallow(<ImageLazy images={images} />);
    expect(component.find(ImageAdaptive).exists()).toBe(true);
  });

  test("should render ImageResponsive if not passed images", () => {
    const component = shallow(<ImageLazy src={images[0].src} />);
    expect(component.find(ImageResponsive).exists()).toBe(true);
  });
});
