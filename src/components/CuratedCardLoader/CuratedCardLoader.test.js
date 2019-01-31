import React from "react";
import { shallow } from "enzyme";
import CuratedCardLoader from "Components/CuratedCardLoader";

describe("CuratedCardLoader", () => {
  test("should do something", () => {
    const rendered = shallow(<CuratedCardLoader msg="hi" />);
    expect(rendered.find("div").length).toBe(1);
    expect(rendered.text()).toBe("CuratedCardLoader says: hi");
    expect(1).toBe(2);
  });
});
