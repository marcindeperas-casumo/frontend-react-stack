import React from "react";
import { shallow } from "enzyme";
import { GameRow } from "Components/GameRow";
import { JackpotsListTile } from "./JackpotsListTile";

describe("<JackpotsListTile />", () => {
  test("renders a <GameRow /> for each game", () => {
    const games = ["one", "two", "three"];
    const rendered = shallow(<JackpotsListTile games={games} />);

    expect(rendered.find(GameRow)).toHaveLength(games.length);
  });
});
