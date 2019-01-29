import React from "react";
import { shallow } from "enzyme";
import VirtualList from "Components/VirtualList";

describe("VirtualList", () => {
  test("should do something", () => {
    const rendered = shallow(<VirtualList msg="hi" />);
    expect(rendered.find("div").length).toBe(1);
    expect(rendered.text()).toBe("VirtualList says: hi");
    expect(1).toBe(2);
  });
});
