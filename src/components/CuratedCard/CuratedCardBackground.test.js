import React from "react";
import { shallow } from "enzyme";
import CuratedCardBackground from "Components/CuratedCard/CuratedCardBackground";
import curatedData from "Reducers/curated/__mocks__/curated.json";

describe("CuratedCard", () => {
  test("should link to promotions if no game", () => {
    const data = { ...curatedData, game: [] };
    const component = shallow(<CuratedCardBackground {...data} />);
    expect(component.find("a").prop("href")).toBe("/promotions");
  });

  test("should have no link if game", () => {
    const component = shallow(<CuratedCardBackground {...curatedData} />);
    expect(component.find("a").prop("href")).toBe(null);
  });

  test("should trigger onClick if game", () => {
    const component = shallow(<CuratedCardBackground {...curatedData} />);
    const onClick = jest.spyOn(component.instance(), "onClick");
    component.instance().forceUpdate();
    component.find("a").simulate("click");

    expect(onClick).toHaveBeenCalled();
  });

  test("should not trigger onClick if no game", () => {
    const d = { ...curatedData, game: [] };
    const component = shallow(<CuratedCardBackground {...d} />);
    const instance = component.instance();
    const spy = jest.spyOn(instance, "onClick");
    component.find("a").simulate("click");
    expect(spy).toHaveBeenCalledTimes(0);
  });
});
