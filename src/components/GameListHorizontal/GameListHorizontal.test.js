import React from "react";
import { mount } from "enzyme";
import {
  GameListHorizontal,
  ITEM_RENDERERS,
  TILE_HEIGHTS,
  ITEMS_CONTROL_STYLING,
} from "Components/GameListHorizontal/GameListHorizontal";
import ScrollableList from "Components/ScrollableList";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import MockStore from "Components/MockStore/index";
import defaultState from "Models/__mocks__/state.mock";
import { Mobile } from "Components/ResponsiveLayout";

const getList = id => ({ id, title: "Title.", games: ["game-1", "game-2"] });
const list = getList("id-1");
const seeMoreText = "whatever";

describe("<GameListHorizontal /> - Mobile", () => {
  let rendered;
  beforeEach(() => {
    setMobileViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <GameListHorizontal list={list} isLoading={false} />
      </MockStore>
    );
  });

  test("should not render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(0);
  });

  test("should render a ScrollableList component", () => {
    expect(rendered.find(ScrollableList)).toHaveLength(1);
  });

  test("passes the list title to the ScrollableList", () => {
    const { title } = rendered.find(ScrollableList).props();

    expect(title).toBe(list.title);
  });

  test("passes the game-ids to the ScrollableList", () => {
    const { itemIds } = rendered.find(ScrollableList).props();

    expect(itemIds).toBe(list.games);
  });

  test("uses the default renderer if it is not specified", () => {
    const { Component } = rendered.find(ScrollableList).props();

    expect(Component).toEqual(ITEM_RENDERERS.default);
  });

  test("passes seeMoreText to the ScrollableList", () => {
    const { seeMoreText: seeMoreTextProp } = mount(
      <MockStore state={defaultState}>
        <GameListHorizontal list={list} seeMoreText={seeMoreText} />
      </MockStore>
    )
      .find(ScrollableList)
      .props();

    expect(seeMoreTextProp).toBe(seeMoreText);
  });

  test("displays a skeleton if the game-list is still loading", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <GameListHorizontal list={list} isLoading={true} />
      </MockStore>
    );

    expect(rendered.find(GameListHorizontalSkeleton)).toHaveLength(1);
    expect(rendered.find(ScrollableList)).toHaveLength(0);
  });

  test("does not render anything if it is loaded but has no games", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <GameListHorizontal list={{}} isLoading={false} />
      </MockStore>
    );

    expect(rendered.isEmptyRender()).toBe(true);
  });
});

describe("<GameListHorizontal /> - Desktop", () => {
  let rendered;
  beforeEach(() => {
    setDesktopViewport();
    rendered = mount(
      <MockStore state={defaultState}>
        <GameListHorizontal list={list} isLoading={false} />
      </MockStore>
    );
  });

  test("should render ScrollableListPaginated component", () => {
    expect(rendered.find("ScrollableListPaginated")).toHaveLength(1);
  });

  test("should not render a ScrollableList component", () => {
    expect(rendered.find(ScrollableList)).toHaveLength(0);
  });

  test("uses the default renderer if it is not specified", () => {
    const { Component } = rendered.find(ScrollableListPaginated).props();

    expect(Component).toEqual(ITEM_RENDERERS.default);
  });

  test("displays a skeleton if the game-list is still loading", () => {
    rendered = mount(
      <MockStore state={defaultState}>
        <GameListHorizontal list={list} isLoading={true} />
      </MockStore>
    );

    expect(rendered.find(GameListHorizontalSkeleton)).toHaveLength(1);
    expect(rendered.find(ScrollableListPaginated)).toHaveLength(0);
  });

  test("uses the default tileHeight if it is not specified", () => {
    const { tileHeight } = rendered.find(ScrollableListPaginated).props();

    expect(tileHeight).toEqual(TILE_HEIGHTS.default);
  });

  test("passes the games list to the ScrollableListPaginated", () => {
    const { list: listProp } = rendered.find(ScrollableListPaginated).props();

    expect(listProp.title).toBe(list.title);
    expect(listProp.itemIds).toBe(list.games);
  });

  test("passes seeMoreText to the ScrollableListPaginated", () => {
    const { seeMore: seeMoreProp } = mount(
      <MockStore state={defaultState}>
        <GameListHorizontal list={list} seeMoreText={seeMoreText} />
      </MockStore>
    )
      .find(ScrollableListPaginated)
      .props();

    expect(seeMoreProp.text).toBe(seeMoreText);
  });

  test("uses the default ITEMS_CONTROL_STYLING if it is not specified", () => {
    const { itemControlClass } = rendered.find(ScrollableListPaginated).props();

    expect(itemControlClass).toEqual(ITEMS_CONTROL_STYLING.default);
  });
});
