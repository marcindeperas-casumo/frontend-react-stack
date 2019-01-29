import React from "react";
import { shallow } from "enzyme";
import GameRowSearchTitle from "Components/GameRowSearch/GameRowSearchTitle";

describe("<GameRowSearchTitle />", () => {
  let query;
  let name;

  test("Should pass the title to a DangerousHtml component if query is not passed down", () => {
    name = "I'm a game title";
    const rendered = shallow(<GameRowSearchTitle name={name} />);

    expect(rendered.find("DangerousHtml").prop("html")).toBe(name);
  });

  test("should pass the title to a MaskText component if a query is passed down", () => {
    query = "game";
    name = "I'm a game title";
    const rendered = shallow(<GameRowSearchTitle query={query} name={name} />);

    expect(rendered.find("TextMaskColored").prop("text")).toBe(name);
  });
});
