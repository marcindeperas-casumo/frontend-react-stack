import React from "react";
import { mount } from "enzyme";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import MockStore from "Components/MockStore/index";
import { LiveCasinoCard } from "Components/LiveCasinoCard";
import defaultState from "Models/__mocks__/state.mock";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameListHorizontalLiveCasino } from "./GameListHorizontalLiveCasino";
import { gamesListMock } from "./__mock__";

describe("GameListHorizontalLiveCasino - Mobile and Tablet", () => {
  let rendered;

  beforeEach(() => {
    setMobileViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <GameListHorizontalLiveCasino list={gamesListMock} />
      </MockStore>
    );
  });

  test("should render list.games.length Game tiles", () => {
    expect(rendered.find(LiveCasinoCard)).toHaveLength(
      gamesListMock.games.length
    );
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(0);
  });
});

describe("GameListHorizontalLiveCasino - Desktop", () => {
  let rendered;
  beforeEach(() => {
    setDesktopViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <GameListHorizontalLiveCasino list={gamesListMock} />
      </MockStore>
    );
  });

  test("should render ScrollableListPaginated component", () => {
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(1);
  });
});
