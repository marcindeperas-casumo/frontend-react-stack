import React from "react";
import { shallow } from "enzyme";
import { GAME_LIST_IDS } from "Src/constants";
import { GameListHorizontalExclusive } from "../GameListHorizontalExclusive";
import { GameListHorizontalDefault } from "../GameListHorizontalDefault";
import { GameListHorizontalCMS } from "./GameListHorizontalCMS";

describe("GameListHorizontal", () => {
  test("should render the default GameListHorizontal if id is not within GAMES_LISTS", () => {
    const rendered = shallow(<GameListHorizontalCMS id="ciao-bello" />);

    expect(rendered.find(GameListHorizontalDefault)).toHaveLength(1);
  });

  test(`should render GameListHorizontalExclusive if id is ${GAME_LIST_IDS.EXCLUSIVE_GAMES}`, () => {
    const rendered = shallow(
      <GameListHorizontalCMS id={GAME_LIST_IDS.EXCLUSIVE_GAMES} />
    );

    expect(rendered.find(GameListHorizontalExclusive)).toHaveLength(1);
  });
});
