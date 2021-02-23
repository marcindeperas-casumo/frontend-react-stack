import React from "react";
import { mount } from "enzyme";
import ResponsiveImage from "@casumo/cmp-responsive-image";
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ isIntersecting: boolean; src: string; }' i... Remove this comment to see the full error message
      <ImageResponsive isIntersecting={true} src={image.src} />
    );
    expect(component.find(ResponsiveImage).exists()).toBe(true);
    expect(component.find(ResponsiveImage).prop("src")).toBe(image.src);
  });

  describe("isIntersecting true", () => {
    test("should render hires image", () => {
      const imgixOpts = { w: 150 };
      const component = mount(
        <ImageResponsive
          // @ts-expect-error ts-migrate(2322) FIXME: Type '{ isIntersecting: boolean; src: string; imgi... Remove this comment to see the full error message
          isIntersecting={true}
          src={image.src}
          imgixOpts={imgixOpts}
        />
      );
      expect(component.find(ResponsiveImage).prop("dpr")).toBe(
        DEVICE_PIXEL_RATIO
      );
      expect(component.find(ResponsiveImage).prop("imgixOpts")).toEqual(
        imgixOpts
      );
    });
  });

  describe("isIntersecting false", () => {
    test("should render lowres image", () => {
      const component = mount(
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ isIntersecting: boolean; src: string; }' i... Remove this comment to see the full error message
        <ImageResponsive isIntersecting={false} src={image.src} />
      );
      expect(component.find(ResponsiveImage).prop("dpr")).toBe(1);
      expect(component.find(ResponsiveImage).prop("imgixOpts")).toEqual(
        LOW_RES_IMAGE_SETTINGS
      );
    });
  });
});
