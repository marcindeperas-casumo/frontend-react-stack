import React from "react";
import { shallow } from "enzyme";
import JackpotsTile from "./JackpotsTile";

describe("<JackpotsTile />", () => {
  test("renders a <JackpotsTileRow /> for each id", () => {
    const ids = ["one", "two", "three"];
    const rendered = shallow(<JackpotsTile ids={ids} />);

    expect(rendered.find("Connect(JackpotsTileRow)").length).toBe(ids.length);
  });
});
