import React from "react";
import { mount } from "enzyme";
import { head } from "ramda";
import { getImgixUrl, getSrcSet } from "@casumo/cudl-react-utils";
import ImageAdaptive from "Components/Image/ImageAdaptive";
import { LOW_RES_IMAGE_SETTINGS } from "../../constants";
import imageData from "./__mocks__/image.json";

describe("ImageAdaptive", () => {
  const images = imageData.images;
  const defaultImgixOpts = { w: 1 };

  describe("isIntersecting true", () => {
    test("should render Picture component", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={true} images={images} />
      );
      expect(component.find("Picture").exists()).toBe(true);
    });

    test("should render imgix src for small_image", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={true} images={images} />
      );
      const img = getImgixUrl(head(images).src, null, defaultImgixOpts);
      const expected = component
        .find("img")
        .at(1)
        .prop("src");
      expect(img).toEqual(expected);
    });

    test("should render imgix <source> srcSet for small_image", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={true} images={images} />
      );
      const srcSet = component
        .find("source")
        .at(0)
        .prop("srcSet");
      const expected = getSrcSet(3, head(images).src, null, defaultImgixOpts);
      expect(srcSet).toEqual(expected);
    });

    test("should render imgix <source> srcSet for medium_image", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={true} images={images} />
      );
      const srcSet = component
        .find("source")
        .at(1)
        .prop("srcSet");
      const expected =
        "https://images.casumo.com/2018/09/cc-medium-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=1 1x, https://images.casumo.com/2018/09/cc-medium-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=2 2x, https://images.casumo.com/2018/09/cc-medium-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=3 3x";
      expect(srcSet).toEqual(expected);
    });

    test("should render imgix <source> srcSet for large_image", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={true} images={images} />
      );
      const srcSet = component
        .find("source")
        .at(2)
        .prop("srcSet");
      const expected =
        "https://images.casumo.com/2018/09/cc-large-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=1 1x, https://images.casumo.com/2018/09/cc-large-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=2 2x, https://images.casumo.com/2018/09/cc-large-starburst.png?w=1&fit=clamp&markscale=95&auto=compress&fm=jpg&markalign=top%2Ccenter&markfit=max&dpr=3 3x";
      expect(srcSet).toEqual(expected);
    });
  });

  describe("isIntersecting false", () => {
    test("should render ResponsiveImage component", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={false} images={images} />
      );
      expect(component.find("ResponsiveImage").exists()).toBe(true);
    });

    test("should render imgix src for small_image", () => {
      const component = mount(
        <ImageAdaptive isIntersecting={false} images={images} />
      );
      const { imgixOpts } = LOW_RES_IMAGE_SETTINGS;
      const img = getImgixUrl(head(images).src, null, imgixOpts);
      const expected = component.find("img").prop("src");
      expect(img).toEqual(expected);
    });
  });
});
