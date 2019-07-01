import React from "react";
import { shallow } from "enzyme";
import ScrollableListPaginated from "Components/ScrollableListPaginated";
import ScrollablePaginated from "Components/ScrollablePaginated";

describe("ScrollableListPaginated", () => {
  let list;
  let className;
  let seeMoreText;
  let seeMoreUrl;
  let Component;
  let tileHeight;

  beforeEach(() => {
    list = {
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
    className = "whatever";
    seeMoreText = "foo";
    seeMoreUrl = "bar";
    Component = () => <p>I'm a beautiful little component</p>;
    tileHeight = 204;
  });
  test("render the title of the list", () => {
    const rendered = shallow(
      <ScrollableListPaginated
        list={list}
        className={className}
        seeMoreText={seeMoreText}
        seeMoreUrl={seeMoreUrl}
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
        list={list}
        className={className}
        seeMoreText={seeMoreText}
        seeMoreUrl={seeMoreUrl}
        Component={Component}
        tileHeight={tileHeight}
      />
    );

    expect(rendered.find(ScrollablePaginated).length).toBe(1);
  });

  test("render seeMoreText and an <a> tag if seeMoreUrl is set", () => {
    const rendered = shallow(
      <ScrollableListPaginated
        list={list}
        className={className}
        seeMoreText={seeMoreText}
        seeMoreUrl={seeMoreUrl}
        Component={Component}
        tileHeight={tileHeight}
      />
    );

    expect(
      rendered
        .find("Text")
        .dive()
        .text()
    ).toMatch(seeMoreText);

    expect(rendered.find("a").prop("href")).toEqual(seeMoreUrl);
  });

  test("not render seeMoreText and an <a> tag if seeMoreUrl is not set", () => {
    const rendered = shallow(
      <ScrollableListPaginated
        list={list}
        className={className}
        seeMoreText={seeMoreText}
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
        list={list}
        className={className}
        seeMoreText={seeMoreText}
        seeMoreUrl={seeMoreUrl}
        Component={Component}
        tileHeight={tileHeight}
      />
    );

    expect(rendered.find(ScrollablePaginated).prop("height")).toEqual(
      tileHeight
    );
  });
});
