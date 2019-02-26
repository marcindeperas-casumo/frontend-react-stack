import React from "react";
import { shallow } from "enzyme";
// Sinon is imported only for testing a debounced version, as there are still prroblems testing it with Jest.
// Once Jest will fully support debounce, we should remove sinon https://github.com/facebook/jest/issues/3465
import sinon from "sinon";
import GameSearchInput from "./GameSearchInput";

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
    const noResults = false;
    const placeholder = "whatever";

    const rendered = shallow(
      <GameSearchInput noResults={noResults} placeholder={placeholder} />
    );

    expect(rendered.prop("placeholder")).toBe(placeholder);
    expect(rendered.prop("noResults")).toBe(noResults);
  });
  test("should debounce fetchSearchResults", () => {
    const initFetchQuerySearch = jest.fn();
    const rendered = shallow(
      <GameSearchInput initFetchQuerySearch={initFetchQuerySearch} />
    );

    expect(initFetchQuerySearch).toHaveBeenCalledTimes(0);

    rendered.setState({ query: "test 1" });
    rendered.setState({ query: "test 2" });
    rendered.setState({ query: "test 3" });

    clock.tick(500);

    expect(initFetchQuerySearch).toHaveBeenCalledTimes(1);
  });

});
