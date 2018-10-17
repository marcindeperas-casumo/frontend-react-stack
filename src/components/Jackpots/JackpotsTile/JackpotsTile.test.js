import React from "react";
import { shallow } from "enzyme";
import JackpotsTile from "./JackpotsTile";

describe("<JackpotsTile />", () => {
  let rendered;
  let ids;

  beforeEach(() => {
    ids = ["one", "two", "three"];
    rendered = shallow(<JackpotsTile ids={ids} />);
  });

  test("renders a <JackpotsTileRow /> for each id", () => {
    expect(rendered.find("Connect(JackpotsTileRow)").length).toBe(ids.length);
  });
});
