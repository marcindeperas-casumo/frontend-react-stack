import React from "react";
import { shallow } from "enzyme";
import ScrollablePaginated from "Components/ScrollablePaginated";
import { myButtonRenderer } from "Components/ScrollablePaginated/ScrollablePaginated.stories";

describe("ScrollablePaginated", () => {
  const renderItem = () => <div />;
  const height = 200;
  const columnCount = 20;

  test("should render ScrollableWithRef", () => {
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <ScrollablePaginated
        columnCount={columnCount}
        buttonRenderer={myButtonRenderer}
        height={height}
        cellRenderer={renderItem}
      />
    );
    expect(rendered.find("ForwardRef").length).toBe(1);
  });

  test("should set classNames on wrapping divs", () => {
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <ScrollablePaginated
        className="chop-chop"
        columnCount={columnCount}
        buttonRenderer={myButtonRenderer}
        height={height}
        cellRenderer={renderItem}
      />
    );
    expect(rendered.hasClass("chop-chop")).toBe(true);
    expect(
      rendered
        .find("ForwardRef")
        .parent()
        .hasClass("chop-chop__list")
    ).toBe(true);
  });

  test("should pass props to ScrollableWithRef", () => {
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <ScrollablePaginated
        className="chop-chop"
        columnCount={columnCount}
        buttonRenderer={myButtonRenderer}
        height={height}
        cellRenderer={renderItem}
      />
    );
    const props = rendered.find("ForwardRef").props();
    expect(props.columnCount).toBe(columnCount);
    expect(props.height).toBe(height);
  });

  test("should render buttons", () => {
    const spy = jest.fn();
    shallow(
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      <ScrollablePaginated
        className="chop-chop"
        columnCount={columnCount}
        buttonRenderer={spy}
        height={height}
        cellRenderer={renderItem}
      />
    );
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
