// @flow
import React from "react";
import { shallow } from "enzyme";
import { GameRowSearchTitle } from "Components/GameRow";

describe("<GameRowSearchTitle />", () => {
  const name = "I'm a game title";

  test("Should pass the title to a DangerousHtml component if query is not passed down", () => {
    const rendered = shallow(<GameRowSearchTitle name={name} />);

    expect(rendered.find("DangerousHtml").prop("html")).toBe(name);
    expect(rendered.find("DangerousHtml").length).toBe(1);
    expect(rendered.find("TextMaskColored").length).toBe(0);
  });

  test("should pass the title to a MaskText component if a query is passed down and highlightSearchQuery set to true", () => {
    const query = "game";
    const rendered = shallow(
      <GameRowSearchTitle query={query} name={name} highlightSearchQuery />
    );

    expect(rendered.find("TextMaskColored").prop("text")).toBe(name);
    expect(rendered.find("DangerousHtml").length).toBe(0);
    expect(rendered.find("TextMaskColored").length).toBe(1);
  });

  test("should pass the title to a DangerousHtml component if a query is passed down and highlightSearchQuery set to false", () => {
    const rendered = shallow(
      <GameRowSearchTitle name={name} highlightSearchQuery={false} />
    );

    expect(rendered.find("DangerousHtml").prop("html")).toBe(name);
    expect(rendered.find("DangerousHtml").length).toBe(1);
    expect(rendered.find("TextMaskColored").length).toBe(0);
  });

  test("should pass the title to a DangerousHtml component if an empty query is passed down", () => {
    const query = "";
    const rendered = shallow(<GameRowSearchTitle query={query} name={name} />);

    expect(rendered.find("DangerousHtml").prop("html")).toBe(name);
    expect(rendered.find("DangerousHtml").length).toBe(1);
    expect(rendered.find("TextMaskColored").length).toBe(0);
  });
});
