import React from "react";
import * as R from "ramda";
import { mount } from "enzyme";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import MockStore from "Components/MockStore/index";
import { GameTileExclusive } from "Components/GameTileExclusive";
import defaultState from "Models/__mocks__/state.mock";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameListHorizontalExclusive } from "./GameListHorizontalExclusive";
const list = {
  name: "A beaut list",
  games: R.times(
    i => ({
      id: `${i}`,
      url: `casumo.es/game/${i}`,
      logo: "https://cms.casumo.com/wp-content/uploads/2016/05/live-roulette-bg.jpg",
      background:
        "https://cms.casumo.com/wp-content/uploads/2016/05/live-roulette-logo.png",
    }),
    4
  ),
};

describe("GameListHorizontalExclusive - Mobile and Tablet", () => {
  let rendered;

  beforeEach(() => {
    setMobileViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; games: { id: string; url: st... Remove this comment to see the full error message */}
        <GameListHorizontalExclusive list={list} />
      </MockStore>
    );
  });

  test("should render list.games.length Game tiles", () => {
    expect(rendered.find(GameTileExclusive)).toHaveLength(list.games.length);
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(0);
  });
});

describe("GameListHorizontalExclusive - Desktop", () => {
  let rendered;
  beforeEach(() => {
    setDesktopViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; games: { id: string; url: st... Remove this comment to see the full error message */}
        <GameListHorizontalExclusive list={list} />
      </MockStore>
    );
  });

  test("should render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(1);
  });
});
