import React from "react";
import { shallow } from "enzyme";
import curatedData from "Models/curated/__mocks__/curated.json";
import { CuratedCardBackgroundNew } from "../CuratedCardBackgroundNew";

describe("CuratedCardBackgroundNew", () => {
  test("should trigger onClick", () => {
    const onClick = jest.fn();
    const component = shallow(
      <CuratedCardBackgroundNew onClick={onClick} {...curatedData} />
    );

    component.find("a").simulate("click");

    expect(onClick).toHaveBeenCalled();
  });
});
