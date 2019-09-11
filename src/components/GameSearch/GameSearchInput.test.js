import React from "react";
import { shallow } from "enzyme";
// Sinon is imported only for testing a debounced function, as there are still problems testing it with Jest.
// Once Jest will fully support debounce, we should remove sinon https://github.com/facebook/jest/issues/3465
import sinon from "sinon";
import { GameSearchInput } from "./GameSearchInput";

describe("GameSearchInput", () => {
  let clock;

  beforeEach(() => {
    clock = sinon.useFakeTimers();
  });

  afterEach(() => {
    clock.restore();
  });

  test("should render a SearchInput component", () => {
    const rendered = shallow(<GameSearchInput />);

    expect(rendered.find("SearchInput")).toHaveLength(1);
  });

  test("should pass down to SearchInput the right props", () => {
    const placeholder = "whatever";

    const rendered = shallow(<GameSearchInput placeholder={placeholder} />);

    expect(rendered.find("SearchInput").prop("placeholder")).toBe(placeholder);
  });

  test("should call fetchSearchResults when component updates query", () => {
    const rendered = shallow(<GameSearchInput />);
    const instance = rendered.instance();
    const fetchSearchResults = jest.spyOn(instance, "fetchSearchResults");

    expect(fetchSearchResults).toHaveBeenCalledTimes(0);

    rendered
      .find("SearchInput")
      .simulate("change", { target: { value: "Let me pass this test 👀" } });
    expect(fetchSearchResults).toHaveBeenCalledTimes(1);
  });

  test("should debounce fetchSearchResults", () => {
    const initFetchGameSearchCount = jest.fn();
    const rendered = shallow(
      <GameSearchInput initFetchGameSearchCount={initFetchGameSearchCount} />
    );

    expect(initFetchGameSearchCount).toHaveBeenCalledTimes(0);

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

    expect(initFetchGameSearchCount).toHaveBeenCalledTimes(1);
  });

  test("should call clear search when onClear (handleClearSearchInput) is called", () => {
    const clearSearch = jest.fn();
    const rendered = shallow(<GameSearchInput clearSearch={clearSearch} />);

    const instance = rendered.instance();
    const handleClearSearchInput = jest.spyOn(
      instance,
      "handleClearSearchInput"
    );

    expect(clearSearch).toHaveBeenCalledTimes(0);

    handleClearSearchInput();

    expect(clearSearch).toHaveBeenCalledTimes(1);
  });
});
