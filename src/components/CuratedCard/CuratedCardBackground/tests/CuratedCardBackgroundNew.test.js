import React from "react";
import { shallow } from "enzyme";
import curatedData from "Models/curated/__mocks__/curated.json";
import { CuratedCardBackgroundNew } from "../CuratedCardBackgroundNew";

describe("CuratedCardBackgroundNew", () => {
  test("should trigger onClick", () => {
    const onLaunchGame = jest.fn();
    const component = shallow(
      <CuratedCardBackgroundNew onLaunchGame={onLaunchGame} {...curatedData} />
    );

    component.find("a").simulate("click");

    expect(onLaunchGame).toHaveBeenCalled();
  });
});
