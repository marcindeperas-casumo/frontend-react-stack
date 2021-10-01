import sinon from "sinon";
import React from "react";
import { shallow } from "enzyme";
// Sinon is imported only for testing a debounced function, as there are still problems testing it with Jest.
// Once Jest will fully support debounce, we should remove sinon https://github.com/facebook/jest/issues/3465
import { GameSearchInput } from "./GameSearchInput";

describe("GameSearchInput", () => {
  let clock;

  beforeEach(() => {
    // eslint-disable-next-line import/no-named-as-default-member
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  test("should render a SearchInput component", () => {
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{}' is missing the following properties from... Remove this comment to see the full error message
    const rendered = shallow(<GameSearchInput />);

    expect(rendered.find("SearchInput")).toHaveLength(1);
  });

  test("should pass down to SearchInput the right props", () => {
    const placeholder = "whatever";

    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ placeholder: string; }' is missing the fol... Remove this comment to see the full error message
    const rendered = shallow(<GameSearchInput placeholder={placeholder} />);

    expect(rendered.find("SearchInput").prop("placeholder")).toBe(placeholder);
  });

  test("should debounce onChange", () => {
    const onChange = jest.fn();
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ onChange: Mock<any, any>; }' is missing th... Remove this comment to see the full error message
    const rendered = shallow(<GameSearchInput onChange={onChange} />);

    expect(onChange).toHaveBeenCalledTimes(0);

    rendered
      .find("SearchInput")
      .simulate("change", { target: { value: "Let me pass this test 👀 " } });
    rendered.find("SearchInput").simulate("change", {
      target: { value: "Let me pass this test 👀 again" },
    });
    rendered.find("SearchInput").simulate("change", {
      target: { value: "Let me pass this test 👀 again and again" },
    });

    clock.tick(500);

    expect(onChange).toHaveBeenCalledTimes(1);
  });

  test("should call clear search when onClear (handleClearSearchInput) is called", () => {
    const clearSearch = jest.fn();
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ clearSearch: Mock<any, any>; }' is missing... Remove this comment to see the full error message
    const rendered = shallow(<GameSearchInput clearSearch={clearSearch} />);

    const instance = rendered.instance();
    const handleClearSearchInput = jest.spyOn(
      instance,
      // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '"handleClearSearchInput"' is not... Remove this comment to see the full error message
      "handleClearSearchInput"
    );

    expect(clearSearch).toHaveBeenCalledTimes(0);

    // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
    handleClearSearchInput();

    expect(clearSearch).toHaveBeenCalledTimes(1);
  });
});
