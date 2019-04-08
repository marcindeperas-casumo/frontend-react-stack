import React from "react";
import { shallow } from "enzyme";
import Scrollable from "Components/Scrollable";

describe("Scrollable", () => {
  test("should do something", () => {
    const rendered = shallow(<Scrollable msg="hi" />);
    expect(rendered.find("div").length).toBe(1);
    expect(rendered.text()).toBe("Scrollable says: hi");
    expect(1).toBe(2);
  });
});
