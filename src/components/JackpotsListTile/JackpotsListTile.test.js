import React from "react";
import { shallow } from "enzyme";
import JackpotsTile from "./JackpotsListTile";

describe("<JackpotsListTile />", () => {
  test("renders a <List /> component", () => {
    const ids = ["one", "two", "three"];
    const rendered = shallow(<JackpotsTile ids={ids} />);
    expect(rendered.find("List")).toHaveLength(1);
  });

  test("renders a <GameRow /> for each game", () => {
    const ids = ["one", "two", "three"];
    const rendered = shallow(<JackpotsTile ids={ids} />);
    const list = rendered.find("List").dive();

    expect(list.find("GameRowContainer")).toHaveLength(ids.length);
  });
});
