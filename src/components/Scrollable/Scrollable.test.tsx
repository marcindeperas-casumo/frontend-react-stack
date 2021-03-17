import { Grid, AutoSizer } from "react-virtualized";
import React from "react";
import { mount } from "enzyme";
import { Scrollable, ScrollableWithRef } from "Components/Scrollable";

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

    // @ts-expect-error ts-migrate(2339) FIXME: Property 'className' does not exist on type 'unkno... Remove this comment to see the full error message
    expect(gridProps.className).toBe("c-scrollable test-test");
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'columnCount' does not exist on type 'unk... Remove this comment to see the full error message
    expect(gridProps.columnCount).toBe(columnCount);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'height' does not exist on type 'unknown'... Remove this comment to see the full error message
    expect(gridProps.height).toBe(height);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'rowHeight' does not exist on type 'unkno... Remove this comment to see the full error message
    expect(gridProps.rowHeight).toBe(height);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'scrollLeft' does not exist on type 'unkn... Remove this comment to see the full error message
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
});

describe("ScrollableWithRef", () => {
  test("should forward innerRef to Scrollable", () => {
    const rendered = mount(
      <ScrollableWithRef
        columnCount={10}
        height={10}
        cellRenderer={() => <div />}
        // @ts-expect-error ts-migrate(2322) FIXME: Type '100' is not assignable to type 'overscanColu... Remove this comment to see the full error message
        overscanColumnCount={100}
        innerRef="foo"
      />
    );
    expect(rendered.find("ForwardRef").length).toBe(1);
    expect(rendered.find("Scrollable").prop("innerRef")).toBe("foo");
  });
});
