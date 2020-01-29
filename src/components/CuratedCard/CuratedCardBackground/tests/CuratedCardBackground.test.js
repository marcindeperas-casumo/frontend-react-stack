import React from "react";
import { shallow } from "enzyme";
import { omit } from "ramda";
import curatedData from "Models/curated/__mocks__/curated.json";
import { CuratedCardBackgroundNew } from "../CuratedCardBackgroundNew";
import { CuratedCardBackgroundDeprecated } from "../CuratedCardBackgroundDeprecated";
import { CuratedCardBackground } from "../CuratedCardBackground";

const deprecatedData = {
  ...omit("image", curatedData),
  small_image: curatedData.image,
  medium_image: curatedData.image,
  large_image: curatedData.image,
};

describe("CuratedCardBackground", () => {
  test("should use CuratedCardBackgroundNew if image is passed in", () => {
    const component = shallow(
      <CuratedCardBackground link="/promotions" {...curatedData} />
    );

    expect(component.find(CuratedCardBackgroundNew).length).toBe(1);
  });

  test("should use CuratedCardBackgroundDeprecated if small, medium, and large images are passed in", () => {
    const component = shallow(
      <CuratedCardBackground link="/promotions" {...deprecatedData} />
    );

    expect(component.find(CuratedCardBackgroundDeprecated).length).toBe(1);
  });
});
