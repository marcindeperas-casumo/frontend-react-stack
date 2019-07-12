import React from "react";
import { shallow } from "enzyme";
import { TopListCuratedCard } from "Components/TopListCuratedCard";

describe("TopListCuratedCard", () => {
  test("should do something", () => {
    const rendered = shallow(<TopListCuratedCard msg="hi" />);
    expect(rendered.find("div").length).toBe(1);
    expect(rendered.text()).toBe("TopListCuratedCard says: hi");
    expect(1).toBe(2);
  });
});
