import React from "react";
import { shallow } from "enzyme";
import { CuratedCardBackground } from "Components/CuratedCard/CuratedCardBackground";
import curatedData from "Models/curated/__mocks__/curated.json";

describe("CuratedCardBackground", () => {
  test("should link to promotions", () => {
    const component = shallow(
      <CuratedCardBackground link="/promotions" {...curatedData} />
    );

    expect(component.find("a").prop("href")).toBe("/promotions");
  });

  test("should trigger onClick", () => {
    const onLaunchGame = jest.fn();
    const component = shallow(
      <CuratedCardBackground onLaunchGame={onLaunchGame} {...curatedData} />
    );

    component.find("a").simulate("click");

    expect(onLaunchGame).toHaveBeenCalled();
  });
});
