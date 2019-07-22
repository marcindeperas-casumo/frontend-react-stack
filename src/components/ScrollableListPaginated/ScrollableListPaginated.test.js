import React from "react";
import { shallow } from "enzyme";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import ScrollablePaginated from "Components/ScrollablePaginated";

describe("ScrollableListPaginated", () => {
  const list = {
    games: [
      "book-of-ra-deluxe",
      "diamond-mine",
      "raging-rhino",
      "jammin-jars",
      "legacy-of-egypt",
      "big-bad-wolf",
      "starburst",
    ],
    id: "popularGames",
    title: "Popular",
  };
  const className = "whatever";
  const seeMore = {
    text: "foo",
    url: "bar",
  };
  const Component = () => <p>I'm a beautiful little component</p>;
  const tileHeight = 204;
  let rendered;

  beforeEach(() => {
    rendered = shallow(
      <ScrollableListPaginated
        list={{
          id: list.id,
          title: list.title,
          itemIds: list.games,
        }}
        className={className}
        seeMore={{
          url: seeMore.url,
          text: seeMore.text,
        }}
        Component={Component}
        tileHeight={tileHeight}
      />
    );
  });

  test("render the list top bar (title and seeMore url)", () => {
    const titleComponent = rendered.find("ScrollableListTitleRow");
    expect(titleComponent.length).toBe(1);
    expect(titleComponent.props().title).toEqual(list.title);
  });

  test("render a ScrollablePaginated component", () => {
    expect(rendered.find(ScrollablePaginated).length).toBe(1);
  });

  test("pass tileHeight to ScrollablePaginated", () => {
    expect(rendered.find(ScrollablePaginated).prop("height")).toEqual(
      tileHeight
    );
  });
});
