import React from "react";
import { shallow } from "enzyme";
import { GameRow } from "Components/GameRow";
import JackpotsTile from "./JackpotsListTile";

describe("<JackpotsListTile />", () => {
  test("renders a <GameRow /> for each game", () => {
    const ids = ["one", "two", "three"];
    const rendered = shallow(<JackpotsTile ids={ids} />);

    expect(rendered.find(GameRow)).toHaveLength(ids.length);
  });
});
