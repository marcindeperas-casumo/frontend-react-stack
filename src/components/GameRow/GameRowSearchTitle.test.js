// @flow
import React from "react";
import { shallow } from "enzyme";
import { GameRowSearchTitle } from "Components/GameRow";

describe("<GameRowSearchTitle />", () => {
  const name = "I'm a game title";
  let isInMaintenance = false;

  test("Should pass the title to a DangerousHtml component if query is not passed down", () => {
    const rendered = shallow(
      <GameRowSearchTitle name={name} isInMaintenance={isInMaintenance} />
    );

    expect(rendered.find("DangerousHtml").prop("html")).toBe(name);
    expect(rendered.find("DangerousHtml").length).toBe(1);
    expect(rendered.find("TextMaskColored").length).toBe(0);
  });

  test("should pass the title to a MaskText component if a query is passed down and highlightSearchQuery set to true", () => {
    const query = "game";
    const rendered = shallow(
      <GameRowSearchTitle
        query={query}
        name={name}
        highlightSearchQuery
        isInMaintenance={isInMaintenance}
      />
    );

    expect(rendered.find("TextMaskColored").prop("text")).toBe(name);
    expect(rendered.find("DangerousHtml").length).toBe(0);
    expect(rendered.find("TextMaskColored").length).toBe(1);
  });

  test("should pass the title to a DangerousHtml component if a query is passed down and highlightSearchQuery set to false", () => {
    const rendered = shallow(
      <GameRowSearchTitle
        name={name}
        highlightSearchQuery={false}
        isInMaintenance={isInMaintenance}
      />
    );

    expect(rendered.find("DangerousHtml").prop("html")).toBe(name);
    expect(rendered.find("DangerousHtml").length).toBe(1);
    expect(rendered.find("TextMaskColored").length).toBe(0);
  });

  test("should pass the title to a DangerousHtml component if an empty query is passed down", () => {
    const query = "";
    const rendered = shallow(
      <GameRowSearchTitle
        query={query}
        name={name}
        isInMaintenance={isInMaintenance}
      />
    );

    expect(rendered.find("DangerousHtml").prop("html")).toBe(name);
    expect(rendered.find("DangerousHtml").length).toBe(1);
    expect(rendered.find("TextMaskColored").length).toBe(0);
  });

  test("should render classname `t-color-grey-light-1` if isInMaintenance is set to true and an empty query is passed down", () => {
    const query = "";
    isInMaintenance = true;
    const rendered = shallow(
      <GameRowSearchTitle
        query={query}
        name={name}
        isInMaintenance={isInMaintenance}
      />
    );

    expect(rendered.find("DangerousHtml").prop("html")).toBe(name);
    expect(rendered.find("DangerousHtml").length).toBe(1);
    expect(
      rendered
        .find("DangerousHtml")
        .last()
        .hasClass("t-color-grey-light-1")
    ).toBe(true);
    expect(rendered.find("TextMaskColored").length).toBe(0);
  });

  test("should render classname `t-color-grey-dark-2` if isInMaintenance is set to false and an empty query is passed down", () => {
    const query = "";
    isInMaintenance = false;
    const rendered = shallow(
      <GameRowSearchTitle
        query={query}
        name={name}
        isInMaintenance={isInMaintenance}
      />
    );

    expect(rendered.find("DangerousHtml").prop("html")).toBe(name);
    expect(rendered.find("DangerousHtml").length).toBe(1);
    expect(
      rendered
        .find("DangerousHtml")
        .last()
        .hasClass("t-color-grey-dark-2")
    ).toBe(true);
    expect(rendered.find("TextMaskColored").length).toBe(0);
  });
});
