import React from "react";
import { shallow } from "enzyme";
import curatedData from "Models/curated/__mocks__/curated.json";
import { CuratedCardBackgroundDeprecated } from "../CuratedCardBackgroundDeprecated";

describe("CuratedCardBackgroundDeprecated", () => {
  test("should trigger onClick", () => {
    const onClick = jest.fn();
    const component = shallow(
      <CuratedCardBackgroundDeprecated
        onClick={onClick}
        small_image={curatedData.image}
        medium_image={curatedData.image}
        large_image={curatedData.image}
      />
    );

    component.find("a").simulate("click");

    expect(onClick).toHaveBeenCalled();
  });
});
