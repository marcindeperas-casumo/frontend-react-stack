import React from "react";
import { shallow } from "enzyme";
import { GAME_LIST_IDS } from "Src/constants";
import { GameListHorizontalExclusive } from "../GameListHorizontalExclusive";
import { GameListHorizontalLiveCasino } from "../GameListHorizontalLiveCasino";
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

  test(`should render GameListHorizontalLiveCasino if id is ${GAME_LIST_IDS.LIVE_CASINO_GAMES}`, () => {
    const rendered = shallow(
      <GameListHorizontalCMS id={GAME_LIST_IDS.LIVE_CASINO_GAMES} />
    );

    expect(rendered.find(GameListHorizontalLiveCasino)).toHaveLength(1);
  });

  test(`should render GameListHorizontalLiveCasino if id is ${GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS}`, () => {
    const rendered = shallow(
      <GameListHorizontalCMS id={GAME_LIST_IDS.LIVE_CASINO_GAMES_ALIAS} />
    );

    expect(rendered.find(GameListHorizontalLiveCasino)).toHaveLength(1);
  });
});
