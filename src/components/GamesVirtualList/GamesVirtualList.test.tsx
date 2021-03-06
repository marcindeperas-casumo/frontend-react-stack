import React from "react";
import { mount } from "enzyme";
import { GamesVirtualList } from "./GamesVirtualList";

const gamesArray = ["easter-island", "starburst"];

describe("GamesVirtualList", () => {
  const fetchPage = jest.fn();
  const renderItem = <div />;

  test("should render a VirtualList given the required params", () => {
    const rendered = mount(
      <GamesVirtualList
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string[]' is not assignable to type 'GameRow... Remove this comment to see the full error message
        games={gamesArray}
        rowCount={50}
        fetchPage={fetchPage}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type '(game: G... Remove this comment to see the full error message
        renderItem={renderItem}
      />
    );

    expect(rendered.find("GamesVirtualList").length).toBe(1);
  });

  test("should render an InfiniteLoader virtualized component", () => {
    const rendered = mount(
      <GamesVirtualList
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string[]' is not assignable to type 'GameRow... Remove this comment to see the full error message
        games={gamesArray}
        rowCount={50}
        fetchPage={fetchPage}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type '(game: G... Remove this comment to see the full error message
        renderItem={renderItem}
      />
    );

    expect(rendered.find("InfiniteLoader").length).toBe(1);
  });

  test("should render an AutoSizer virtualized component", () => {
    const rendered = mount(
      <GamesVirtualList
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string[]' is not assignable to type 'GameRow... Remove this comment to see the full error message
        games={gamesArray}
        rowCount={50}
        fetchPage={fetchPage}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type '(game: G... Remove this comment to see the full error message
        renderItem={renderItem}
      />
    );

    expect(rendered.find("AutoSizer").length).toBe(1);
  });

  test("should render a List virtualized component", () => {
    const rendered = mount(
      <GamesVirtualList
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'string[]' is not assignable to type 'GameRow... Remove this comment to see the full error message
        games={gamesArray}
        rowCount={50}
        fetchPage={fetchPage}
        // @ts-expect-error ts-migrate(2322) FIXME: Type 'Element' is not assignable to type '(game: G... Remove this comment to see the full error message
        renderItem={renderItem}
      />
    );

    expect(rendered.find("List").length).toBe(1);
  });
});
