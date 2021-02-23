import React from "react";
import { mount } from "enzyme";
import { Grid, AutoSizer } from "react-virtualized";
import { Scrollable, ScrollableWithRef } from "Components/Scrollable";

describe("Scrollable", () => {
  const renderItem = () => <div />;
  const scrollHandler = ({ scrollLeft }) => {};
  const height = 200;
  const columnCount = 20;
  const defaultWidth = 100;

  test("should render an Autosized Grid", () => {
    const rendered = mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Scrollable
        columnCount={columnCount}
        height={height}
        cellRenderer={renderItem}
      />
    );
    expect(rendered.find(AutoSizer).length).toBe(1);
    expect(rendered.find(Grid).length).toBe(1);
  });

  test("should pass Grid specific props to Grid", () => {
    const rendered = mount(
      <Scrollable
        columnCount={columnCount}
        height={height}
        cellRenderer={renderItem}
        className="test-test"
        defaultWidth={defaultWidth}
        scrollLeft={300}
        // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
        scrollHandler={scrollHandler}
      />
    );
    const gridProps = rendered.find(Grid).props();

    expect(gridProps.className).toBe("c-scrollable test-test");
    expect(gridProps.columnCount).toBe(columnCount);
    expect(gridProps.height).toBe(height);
    expect(gridProps.rowHeight).toBe(height);
    expect(gridProps.scrollLeft).toBe(300);
  });

  test("should only have one row", () => {
    const rendered = mount(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <Scrollable
        columnCount={columnCount}
        height={height}
        cellRenderer={renderItem}
      />
    );
    expect(rendered.find(Grid).prop("rowCount")).toBe(1);
  });
});

describe("ScrollableWithRef", () => {
  test("should forward innerRef to Scrollable", () => {
    const rendered = mount(
      <ScrollableWithRef
        // @ts-expect-error ts-migrate(2322) FIXME: Type '{ columnCount: number; height: number; cellR... Remove this comment to see the full error message
        columnCount={10}
        height={10}
        cellRenderer={() => <div />}
        overscanColumnCount={100}
        innerRef="foo"
      />
    );
    expect(rendered.find("ForwardRef").length).toBe(1);
    expect(rendered.find("Scrollable").prop("innerRef")).toBe("foo");
  });
});
