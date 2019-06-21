import React from "react";
import { shallow } from "enzyme";
import {
  GameListHorizontal,
  ITEM_SPACING,
  ITEM_RENDERERS,
  ITEM_RENDERERS_HEIGHTS,
} from "Components/GameListHorizontal/GameListHorizontal";
import ScrollableList from "Components/ScrollableList";
import { GameListHorizontalSkeleton } from "Components/GameListHorizontal/GameListHorizontalSkeleton";
import { GameListHorizontalDesktop } from "Components/GameListHorizontal/GameListHorizontalDesktop";
import { Desktop, Mobile } from "Components/ResponsiveLayout";

const getList = id => ({ id, title: "Title.", games: ["game-1", "game-2"] });
const list = getList("id-1");
const seeMoreText = "whatever";

describe("GameListHorizontal Mobile", () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <GameListHorizontal list={list} isLoading={false} />
    ).find(Mobile);
  });

  test("renders a ScrollableList", () => {
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

  test("uses the default spacing if it is not specified", () => {
    const { spacing } = rendered.find(ScrollableList).props();

    expect(spacing).toBe(ITEM_SPACING.default);
  });

  test("uses the default renderer if it is not specified", () => {
    const { Component } = rendered.find(ScrollableList).props();

    expect(Component).toEqual(ITEM_RENDERERS.default);
  });

  test("speficies spacing by list id", () => {
    Object.keys(ITEM_SPACING).forEach(listId => {
      rendered = shallow(<GameListHorizontal list={getList(listId)} />).find(
        "Mobile"
      );
      const { spacing } = rendered.find(ScrollableList).props();

      expect(spacing).toBe(ITEM_SPACING[listId]);
    });
  });

  test("speficies renderer by list id", () => {
    Object.keys(ITEM_RENDERERS).forEach(listId => {
      rendered = shallow(<GameListHorizontal list={getList(listId)} />).find(
        ScrollableList
      );
      const { Component } = rendered.props();

      expect(Component).toEqual(ITEM_RENDERERS[listId]);
    });
  });

  test("passes seeMoreText to the ScrollableList", () => {
    const { seeMoreText: seeMoreTextProp } = shallow(
      <GameListHorizontal list={list} seeMoreText={seeMoreText} />
    )
      .find(ScrollableList)
      .props();

    expect(seeMoreTextProp).toBe(seeMoreText);
  });

  test("displays a skeleton if the game-list is still loading", () => {
    rendered = shallow(<GameListHorizontal list={list} isLoading={true} />);

    expect(rendered.find(GameListHorizontalSkeleton)).toHaveLength(1);
    expect(rendered.find(ScrollableList)).toHaveLength(0);
  });

  test("does not render anything if it is loaded but has no games", () => {
    rendered = shallow(<GameListHorizontal list={{}} isLoading={false} />);

    expect(rendered.html()).toBeNull();
  });
});

describe("GameListHorizontal Desktop", () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <GameListHorizontal list={list} isLoading={false} />
    ).find(Desktop);
  });

  test("renders a GameListHorizontalDesktop", () => {
    expect(rendered.find(GameListHorizontalDesktop)).toHaveLength(1);
  });

  test("uses the default renderer if it is not specified", () => {
    const { Component } = rendered.find(GameListHorizontalDesktop).props();

    expect(Component).toEqual(ITEM_RENDERERS.default);
  });

  test("displays a skeleton if the game-list is still loading", () => {
    rendered = shallow(<GameListHorizontal list={list} isLoading={true} />);

    expect(rendered.find(GameListHorizontalSkeleton)).toHaveLength(1);
    expect(rendered.find(GameListHorizontalDesktop)).toHaveLength(0);
  });

  test("uses the default tileHeight if it is not specified", () => {
    const { tileHeight } = rendered.find(GameListHorizontalDesktop).props();

    expect(tileHeight).toEqual(ITEM_RENDERERS_HEIGHTS.default);
  });

  test("passes the games list to the GameListHorizontalDesktop", () => {
    const { list: listProp } = rendered.find(GameListHorizontalDesktop).props();

    expect(listProp).toBe(list);
  });

  test("passes seeMoreText to the GameListHorizontalDesktop", () => {
    const { seeMoreText: seeMoreTextProp } = shallow(
      <GameListHorizontal list={list} seeMoreText={seeMoreText} />
    )
      .find(GameListHorizontalDesktop)
      .props();

    expect(seeMoreTextProp).toBe(seeMoreText);
  });
});
