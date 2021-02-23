import React from "react";
import { mount } from "enzyme";
import { always } from "ramda";
import VirtualList from "Components/VirtualList";

describe("VirtualList", () => {
  test("should render a VirtualList given the required params", () => {
    const rendered = mount(
      <VirtualList
        isRowLoaded={always(true)}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
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
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        loadMoreRows={() => [1, 2, 3]}
        rowHeight={10}
        rowRenderer={() => <div />}
        totalNumberOfRows={100}
      />
    );

    expect(rendered.find("List").length).toBe(1);
  });
});
