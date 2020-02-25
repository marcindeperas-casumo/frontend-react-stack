import React from "react";
import { shallow } from "enzyme";
import List from "@casumo/cmp-list";
import { GameRow } from "Components/GameRow/GameRow";
import { GameListVertical } from "./GameListVertical";
import { games } from "./__mock__";

describe("<GameListVertical />", () => {
  test("should render a list", () => {
    const rendered = shallow(<GameListVertical games={games} />);

    expect(rendered.find("List")).toHaveLength(1);
  });

  test("should render a <GameRow /> component for each game", () => {
    const rendered = shallow(<GameListVertical games={games} />);

    const list = rendered.find(List).dive();

    expect(list.find(GameRow)).toHaveLength(games.length);
  });
});
