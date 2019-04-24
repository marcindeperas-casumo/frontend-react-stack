import React from "react";
import { mount } from "enzyme";
import { Grid, AutoSizer } from "react-virtualized";
import Scrollable, {
  ScrollableWithRef,
  MAX_OVERSCAN_COLUMN_COUNT,
} from "Components/Scrollable";

describe("Scrollable", () => {
  const renderItem = () => <div />;
  const scrollHandler = ({ scrollLeft }) => {};
  const height = 200;
  const columnCount = 20;
  const defaultWidth = 100;

  test("should render an Autosized Grid", () => {
    const rendered = mount(
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
        scrollHandler={scrollHandler}
      />
    );
    const gridProps = rendered.find(Grid).props();

    expect(gridProps.className).toBe("test-test");
    expect(gridProps.columnCount).toBe(columnCount);
    expect(gridProps.height).toBe(height);
    expect(gridProps.rowHeight).toBe(height);
    expect(gridProps.scrollLeft).toBe(300);
  });

  test("should only have one row", () => {
    const rendered = mount(
      <Scrollable
        columnCount={columnCount}
        height={height}
        cellRenderer={renderItem}
      />
    );
    expect(rendered.find(Grid).prop("rowCount")).toBe(1);
  });

  test("should not set overscanColumnCount greater than MAX_OVERSCAN_COLUMN_COUNT", () => {
    const rendered = mount(
      <Scrollable
        columnCount={columnCount}
        height={height}
        cellRenderer={renderItem}
        overscanColumnCount={100}
      />
    );
    expect(rendered.find(Grid).prop("overscanColumnCount")).toBe(
      MAX_OVERSCAN_COLUMN_COUNT
    );
  });
});

describe("ScrollableWithRef", () => {
  test("should forward innerRef to Scrollable", () => {
    const rendered = mount(
      <ScrollableWithRef
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
