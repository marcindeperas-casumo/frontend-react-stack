import React from "react";
import { shallow } from "enzyme";
import GameListVertical from "./GameListVertical";

describe("<GameListVertical />", () => {
  test("should render a list", () => {
    const rendered = shallow(<GameListVertical ids={["one", "two"]} />);

    expect(rendered.find("List")).toHaveLength(1);
  });

  test("should render a <GameRow /> component for each game", () => {
    const rendered = shallow(<GameListVertical ids={["one", "two"]} />);
    const list = rendered.find("List").dive();

    expect(list.find("GameRowContainer")).toHaveLength(2);
  });
});
