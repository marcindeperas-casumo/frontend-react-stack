import React from "react";
import { shallow } from "enzyme";
import curatedData from "Models/curated/__mocks__/curated.json";
import { CuratedCardBackgroundNew } from "../CuratedCardBackgroundNew";
import { CuratedCardBackgroundDeprecated } from "../CuratedCardBackgroundDeprecated";
import { CuratedCardBackground } from "../CuratedCardBackground";

describe("CuratedCardBackground", () => {
  test("should use CuratedCardBackgroundNew if image is passed in", () => {
    const component = shallow(
      <CuratedCardBackground
        link="/promotions"
        onClick={() => {}}
        image={curatedData.image}
      />
    );

    expect(component.find(CuratedCardBackgroundNew).length).toBe(1);
  });

  test("should use CuratedCardBackgroundDeprecated if small, medium, and large images are passed in", () => {
    const component = shallow(
      <CuratedCardBackground
        link="/promotions"
        small_image={curatedData.image}
        medium_image={curatedData.image}
        large_image={curatedData.image}
      />
    );

    expect(component.find(CuratedCardBackgroundDeprecated).length).toBe(1);
  });
});
