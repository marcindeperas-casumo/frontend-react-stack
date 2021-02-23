// @flow
import * as React from "react";
import { mount } from "enzyme";
import MockStore from "Components/MockStore";
import { games } from "Components/GamesVirtualList/__mock__";
import { GamesVirtualGrid } from "./GamesVirtualGrid";

describe("GamesVirtualGrid", () => {
  const fetchPage = jest.fn();
  const rendered = mount(
    <MockStore>
      <GamesVirtualGrid
        games={games}
        gamesCount={games.length}
        loadMore={fetchPage}
        pageSize={20}
      />
    </MockStore>
  );

  test("should render given the required params", () => {
    expect(rendered.find("GamesVirtualGrid")).toHaveLength(1);
  });

  test("should render an InfiniteLoader virtualized component", () => {
    expect(rendered.find("InfiniteLoader")).toHaveLength(1);
  });

  test("should render a Grid virtualized component", () => {
    expect(rendered.find("Grid")).toHaveLength(1);
  });
});
