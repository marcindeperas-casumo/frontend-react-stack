import React from "react";
import { mount } from "enzyme";
import VirtualList from "Components/VirtualList";
import { always } from "ramda";

describe("VirtualList", () => {
  test("should render a VirtualList given the required params", () => {
    const rendered = mount(
      <VirtualList
        isRowLoaded={always(true)}
        loadMoreRows={() => [1, 2, 3]}
        rowHeight={10}
        rowRenderer={() => <div />}
        totalNumberOfRows={100}
      />
    );

    expect(rendered.find("VirtualList").length).toBe(1);
  });

  test("should render an InfiniteLoader virtualized component", () => {
    const rendered = mount(
      <VirtualList
        isRowLoaded={always(true)}
        loadMoreRows={() => [1, 2, 3]}
        rowHeight={10}
        rowRenderer={() => <div />}
        totalNumberOfRows={100}
      />
    );

    expect(rendered.find("InfiniteLoader").length).toBe(1);
  });

  test("should render an AutoSizer virtualized component", () => {
    const rendered = mount(
      <VirtualList
        isRowLoaded={always(true)}
        loadMoreRows={() => [1, 2, 3]}
        rowHeight={10}
        rowRenderer={() => <div />}
        totalNumberOfRows={100}
      />
    );

    expect(rendered.find("AutoSizer").length).toBe(1);
  });

  test("should render a List virtualized component", () => {
    const rendered = mount(
      <VirtualList
        isRowLoaded={always(true)}
        loadMoreRows={() => [1, 2, 3]}
        rowHeight={10}
        rowRenderer={() => <div />}
        totalNumberOfRows={100}
      />
    );

    expect(rendered.find("List").length).toBe(1);
  });
});
