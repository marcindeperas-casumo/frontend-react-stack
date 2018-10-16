import React from "react";
import { shallow } from "enzyme";
import ScrollableList from "Components/ScrollableList";
import GameTileExclusiveContainer from "Containers/GameTileExclusiveContainer";
import LiveCasinoCardContainer from "Containers/LiveCasinoCardContainer";
import GameListTitle from "Components/GameList/GameListTitle";

describe("ScrollableList", () => {
  test("render the title of the list", () => {
    const rendered = shallow(<ScrollableList id="id" games={[1]} title="hi" />);

    expect(rendered.find("GameListTitle").props()).toMatchObject({
      title: "hi",
    });
  });

  test("do not render anything if the games are empty", () => {
    const rendered = shallow(<ScrollableList id="id" games={[]} title="hi" />);

    expect(rendered.get(0)).toBeNull();
  });

  test("render GameTileExclusiveContainer for listId exclusiveGames ", () => {
    const rendered = shallow(
      <ScrollableList id="exclusiveGames" games={[1]} title="hi" />
    );

    expect(rendered.find(GameTileExclusiveContainer).length).toBe(1);
  });

  test("render LiveCasinoCardContainer for listId liveCasinoGames", () => {
    const rendered = shallow(
      <ScrollableList id="liveCasinoGames" games={[1]} title="hi" />
    );

    expect(rendered.find(LiveCasinoCardContainer).length).toBe(1);
  });

  test("render LiveCasinoCardContainer for listId liveCasino", () => {
    const rendered = shallow(
      <ScrollableList id="liveCasino" games={[1]} title="hi" />
    );

    expect(rendered.find(LiveCasinoCardContainer).length).toBe(1);
  });

  test("render GameListTitle for a listId that we don't know", () => {
    const rendered = shallow(
      <ScrollableList id="foo" games={[1]} title="hi" />
    );

    expect(rendered.find(GameListTitle).length).toBe(1);
  });

  test("use itemSpacing='md' for Scrolling component when the listId is liveCasinoGames", () => {
    const rendered = shallow(
      <ScrollableList id="liveCasinoGames" games={[1]} title="hi" />
    );

    expect(rendered.find("Scrollable").props()).toMatchObject({
      itemSpacing: "md",
    });
  });

  test("use itemSpacing='md' for Scrolling component when the listId is liveCasino", () => {
    const rendered = shallow(
      <ScrollableList id="liveCasinoGames" games={[1]} title="hi" />
    );

    expect(rendered.find("Scrollable").props()).toMatchObject({
      itemSpacing: "md",
    });
  });

  test("use itemSpacing='default' for Scrolling component when we don't know the listId ", () => {
    const rendered = shallow(
      <ScrollableList id="foo" games={[1]} title="hi" />
    );

    expect(rendered.find("Scrollable").props()).toMatchObject({
      itemSpacing: "default",
    });
  });
});
