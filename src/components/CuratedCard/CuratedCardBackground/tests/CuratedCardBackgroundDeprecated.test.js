import React from "react";
import { shallow } from "enzyme";
import { omit } from "ramda";
import curatedData from "Models/curated/__mocks__/curated.json";
import { CuratedCardBackgroundDeprecated } from "../CuratedCardBackgroundDeprecated";

const deprecatedData = {
  ...omit("image", curatedData),
  small_image: curatedData.image,
  medium_image: curatedData.image,
  large_image: curatedData.image,
};

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
