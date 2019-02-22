import React from "react";
import { shallow } from "enzyme";
import GameSearchInput from "./GameSearchInput";

describe("GameSearchInput", () => {
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
});
