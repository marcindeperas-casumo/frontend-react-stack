import React from "react";
import { mount } from "enzyme";
import GamesVirtualList from "Components/GamesVirtualList/GamesVirtualList";

const gamesArray = ["easter-island", "starburst"];

describe("GamesVirtualList", () => {
  let fetchPage;
  let renderItem;

  beforeAll(() => {
    fetchPage = jest.fn();
    renderItem = id => <div />;
  });

  test("should render a VirtualList given the required params", () => {
    const rendered = mount(
      <GamesVirtualList
        games={gamesArray}
        rowCount={50}
        fetchPage={fetchPage}
        renderItem={renderItem}
      />
    );

    expect(rendered.find("GamesVirtualList").length).toBe(1);
  });

  test("should render an InfiniteLoader virtualized component", () => {
    const rendered = mount(
      <GamesVirtualList
        games={gamesArray}
        rowCount={50}
        fetchPage={fetchPage}
        renderItem={renderItem}
      />
    );

    expect(rendered.find("InfiniteLoader").length).toBe(1);
  });

  test("should render an AutoSizer virtualized component", () => {
    const rendered = mount(
      <GamesVirtualList
        games={gamesArray}
        rowCount={50}
        fetchPage={fetchPage}
        renderItem={renderItem}
      />
    );

    expect(rendered.find("AutoSizer").length).toBe(1);
  });

  test("should render a List virtualized component", () => {
    const rendered = mount(
      <GamesVirtualList
        games={gamesArray}
        rowCount={50}
        fetchPage={fetchPage}
        renderItem={renderItem}
      />
    );

    expect(rendered.find("List").length).toBe(1);
  });
});
