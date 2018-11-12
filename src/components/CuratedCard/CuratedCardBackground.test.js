import React from "react";
import { shallow } from "enzyme";
import CuratedCardBackground from "Components/CuratedCard/CuratedCardBackground";
import { isEmpty } from "ramda";
import curatedData from "Reducers/curated/__mocks__/curated.json";

describe("CuratedCard", () => {
  test("should link to promotions", () => {
    const data = { ...curatedData, game: [] };
    const component = shallow(
      <CuratedCardBackground link="/promotions" {...curatedData} />
    );

    expect(component.find("a").prop("href")).toBe("/promotions");
  });

  test("should trigger onClick", () => {
    const onClick = jest.fn();
    const component = shallow(
      <CuratedCardBackground onClick={onClick} {...curatedData} />
    );
    const instance = component.instance();
    component.find("a").simulate("click");

    expect(onClick).toHaveBeenCalled();
  });
});
