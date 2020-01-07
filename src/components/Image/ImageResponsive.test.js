import React from "react";
import { mount } from "enzyme";
import ImageResponsive from "Components/Image/ImageResponsive";
import { DEVICE_PIXEL_RATIO, LOW_RES_IMAGE_SETTINGS } from "../../constants";
import imageData from "./__mocks__/image.json";

jest.mock("../../constants", () => ({
  ...jest.requireActual("../../constants"),
  DEVICE_PIXEL_RATIO: 3,
}));

describe("ImageResponsive", () => {
  const image = imageData.images[0];

  beforeEach(() => {
    jest.resetModules();
  });

  test("should render ResponsiveImage component", () => {
    const component = mount(
      <ImageResponsive isIntersecting={true} src={image.src} />
    );
    expect(component.find("ResponsiveImage").exists()).toBe(true);
    expect(component.find("ResponsiveImage").prop("src")).toBe(image.src);
  });

  describe("isIntersecting true", () => {
    test("should render hires image", () => {
      const imgixOpts = { w: 150 };
      const component = mount(
        <ImageResponsive
          isIntersecting={true}
          src={image.src}
          imgixOpts={imgixOpts}
        />
      );
      expect(component.find("ResponsiveImage").prop("dpr")).toBe(
        DEVICE_PIXEL_RATIO
      );
      expect(component.find("ResponsiveImage").prop("imgixOpts")).toEqual(
        imgixOpts
      );
    });
  });

  describe("isIntersecting false", () => {
    test("should render lowres image", () => {
      const component = mount(
        <ImageResponsive isIntersecting={false} src={image.src} />
      );
      expect(component.find("ResponsiveImage").prop("dpr")).toBe(1);
      expect(component.find("ResponsiveImage").prop("imgixOpts")).toEqual(
        LOW_RES_IMAGE_SETTINGS
      );
    });
  });
});
