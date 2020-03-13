import React from "react";
import { shallow } from "enzyme";
import { GameRow } from "Components/GameRow/GameRow";
import { JackpotsListTile } from "./JackpotsListTile";

describe("<JackpotsListTile />", () => {
  test("renders a <GameRow /> for each game", () => {
    const games = [
      { id: 1, slug: "one" },
      { id: 2, slug: "two" },
      { id: 3, slug: "three" },
    ];
    const rendered = shallow(<JackpotsListTile games={games} />);

    expect(rendered.find(GameRow)).toHaveLength(games.length);
  });
});
