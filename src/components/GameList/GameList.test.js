import React from "react";
import { shallow, mount } from "enzyme";
import GameList, {
  ITEM_SPACING,
  ITEM_RENDERERS,
} from "Components/GameList/GameList";

const getList = id => ({ id, title: "Title.", games: ["game-1", "game-2"] });
const list = getList("id-1");

describe("GameList", () => {
  let rendered;

  beforeEach(() => {
    rendered = shallow(<GameList list={list} isLoading={false} />);
  });

  test("renders a ScrollableList", () => {
    expect(rendered.find("ScrollableList")).toHaveLength(1);
  });

  test("passes the list title to the ScrollableList", () => {
    const { title } = rendered.find("ScrollableList").props();

    expect(title).toBe(list.title);
  });

  test("passes the game-ids to the ScrollableList", () => {
    const { itemIds } = rendered.find("ScrollableList").props();

    expect(itemIds).toBe(list.games);
  });

  test("uses the default spacing if it is not specified", () => {
    const { spacing } = rendered.find("ScrollableList").props();

    expect(spacing).toBe(ITEM_SPACING.default);
  });

  test("uses the default renderer if it is not specified", () => {
    const { Component } = rendered.find("ScrollableList").props();

    expect(Component).toEqual(ITEM_RENDERERS.default);
  });

  test("speficies spacing by list id", () => {
    Object.keys(ITEM_SPACING).forEach(listId => {
      const rendered = shallow(<GameList list={getList(listId)} />);
      const { spacing } = rendered.props();

      expect(spacing).toBe(ITEM_SPACING[listId]);
    });
  });

  test("speficies renderer by list id", () => {
    Object.keys(ITEM_RENDERERS).forEach(listId => {
      const rendered = shallow(<GameList list={getList(listId)} />);
      const { Component } = rendered.props();

      expect(Component).toEqual(ITEM_RENDERERS[listId]);
    });
  });

  test("displays a skeleton if the game-list is still loading", () => {
    rendered = shallow(<GameList list={list} isLoading={true} />);

    expect(rendered.find("GameListSkeleton")).toHaveLength(1);
    expect(rendered.find("ScrollableList")).toHaveLength(0);
  });

  test("does not render anything if it is loaded but has no games", () => {
    rendered = shallow(<GameList list={{}} isLoading={false} />);

    expect(rendered.html()).toBeNull();
  });
});
