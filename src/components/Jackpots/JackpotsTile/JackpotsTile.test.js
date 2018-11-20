import React from "react";
import { shallow } from "enzyme";
import JackpotsTile from "./JackpotsTile";

describe("<JackpotsTile />", () => {
  test("renders a <GameListRow /> for each id", () => {
    const ids = ["one", "two", "three"];
    const rendered = shallow(<JackpotsTile ids={ids} />);
    expect(rendered.find("GameListRowContainer").length).toBe(ids.length);
  });
});
