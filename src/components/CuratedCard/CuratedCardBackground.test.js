import React from "react";
import { shallow } from "enzyme";
import { omit } from "ramda";
import {
  CuratedCardBackground,
  CuratedCardBackgroundNew,
  CuratedCardBackgroundDeprecated,
} from "Components/CuratedCard/CuratedCardBackground";
import curatedData from "Models/curated/__mocks__/curated.json";

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

describe("CuratedCardBackgroundDeprecated", () => {
  test("should trigger onClick", () => {
    const onLaunchGame = jest.fn();
    const component = shallow(
      <CuratedCardBackgroundDeprecated
        onLaunchGame={onLaunchGame}
        {...deprecatedData}
      />
    );

    component.find("a").simulate("click");

    expect(onLaunchGame).toHaveBeenCalled();
  });
});

describe("CuratedCardBackgroundNew", () => {
  test("should trigger onClick", () => {
    const onLaunchGame = jest.fn();
    const component = shallow(
      <CuratedCardBackgroundDeprecated
        onLaunchGame={onLaunchGame}
        {...curatedData}
      />
    );

    component.find("a").simulate("click");

    expect(onLaunchGame).toHaveBeenCalled();
  });
});
