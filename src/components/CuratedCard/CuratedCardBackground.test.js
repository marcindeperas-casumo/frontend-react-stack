import React from "react";
import { mount } from "enzyme";
import CuratedCardBackground from "Components/CuratedCard/CuratedCardBackground";
import curatedData from "Reducers/curated/__mocks__/curated.json";

describe("CuratedCard", () => {
  test("should link to promotions if no game", () => {
    const data = { ...curatedData, game: [] };
    const component = mount(<CuratedCardBackground {...data} />);
    expect(component.find("a").prop("href")).toBe("/promotions");
  });

  test("should have no link if game", () => {
    const component = mount(<CuratedCardBackground {...curatedData} />);
    expect(component.find("a").prop("href")).toBe(null);
  });

  test("should trigger onClick if game", () => {
    const component = mount(<CuratedCardBackground {...curatedData} />);
    const onClick = jest.spyOn(component.instance(), "onClick");
    component.instance().forceUpdate();
    component.find("a").simulate("click");

    expect(onClick).toHaveBeenCalled();
  });

  test("should not trigger onClick if no game", () => {
    const d = { ...curatedData, game: [] };
    const component = mount(<CuratedCardBackground {...d} />);
    const onClick = jest.spyOn(component.instance(), "onClick");
    component.instance().forceUpdate();
    component.find("a").simulate("click");

    expect(onClick).toHaveBeenCalledTimes(0);
  });
});
