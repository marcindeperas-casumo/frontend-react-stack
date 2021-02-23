import React from "react";
import * as R from "ramda";
import { mount } from "enzyme";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import MockStore from "Components/MockStore/index";
import { GameTile } from "Components/GameTile";
import defaultState from "Models/__mocks__/state.mock";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameListHorizontalDefault } from "./GameListHorizontalDefault";
const list = {
  name: "A beaut list",
  games: R.times(
    i => ({
      id: `${i}`,
      url: `casumo.es/game/${i}`,
      logo:
        "https://cms.casumo.com/wp-content/uploads/2016/05/live-roulette-bg.jpg",
      background:
        "https://cms.casumo.com/wp-content/uploads/2016/05/live-roulette-logo.png",
    }),
    4
  ),
};

describe("GameListHorizontalDefault - Mobile and Tablet", () => {
  let rendered;

  beforeEach(() => {
    setMobileViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <GameListHorizontalDefault list={list} />
      </MockStore>
    );
  });

  test("should render list.games.length Game tiles", () => {
    expect(rendered.find(GameTile)).toHaveLength(list.games.length);
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(0);
  });
});

describe("GameListHorizontalDefault - Desktop", () => {
  let rendered;
  beforeEach(() => {
    setDesktopViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <GameListHorizontalDefault list={list} />
      </MockStore>
    );
  });

  test("should render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(1);
  });
});
