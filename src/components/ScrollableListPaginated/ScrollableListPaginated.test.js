import React from "react";
import { shallow } from "enzyme";
import ScrollableListPaginated from "Components/ScrollableListPaginated";
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

  test("render the title of the list", () => {
    const rendered = shallow(
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

    const titleComponent = rendered.find("ScrollableListTitle");
    expect(titleComponent.length).toBe(1);
    expect(titleComponent.props().title).toEqual(list.title);
  });

  test("render a ScrollablePaginated component", () => {
    const rendered = shallow(
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

    expect(rendered.find(ScrollablePaginated).length).toBe(1);
  });

  test("render seeMore.text and an seeMore.url on an <a> tag if seeMore is set", () => {
    const rendered = shallow(
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

    expect(
      rendered
        .find("Text")
        .dive()
        .text()
    ).toMatch(seeMore.text);

    expect(rendered.find("a").prop("href")).toEqual(seeMore.url);
  });

  test("not render seeMore text and url on an <a> tag if seeMore is not set", () => {
    const rendered = shallow(
      <ScrollableListPaginated
        list={{
          id: list.id,
          title: list.title,
          itemIds: list.games,
        }}
        className={className}
        Component={Component}
        tileHeight={tileHeight}
      />
    );

    expect(rendered.find("Text")).toHaveLength(0);
    expect(rendered.find("a")).toHaveLength(0);
  });

  test("pass tileHeight to ScrollablePaginated", () => {
    const rendered = shallow(
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

    expect(rendered.find(ScrollablePaginated).prop("height")).toEqual(
      tileHeight
    );
  });
});
