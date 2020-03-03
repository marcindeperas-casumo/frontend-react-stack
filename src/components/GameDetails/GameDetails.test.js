import React from "react";
import { shallow } from "enzyme";
import { GameDetails } from "Components/GameDetails";

describe("GameDetails", () => {
  test("should do something", () => {
    const rendered = shallow(<GameDetails msg="hi" />);
    expect(rendered.find("div").length).toBe(1);
    expect(rendered.text()).toBe("GameDetails says: hi");
    expect(1).toBe(2);
  });
});
