import React from "react";
import { shallow } from "enzyme";
import { ScrollablePaginated } from "Components/ScrollablePaginated";

describe("ScrollablePaginated", () => {
  test("should do something", () => {
    const rendered = shallow(<ScrollablePaginated msg="hi" />);
    expect(rendered.find("div").length).toBe(1);
    expect(rendered.text()).toBe("ScrollablePaginated says: hi");
    expect(1).toBe(2);
  });
});
