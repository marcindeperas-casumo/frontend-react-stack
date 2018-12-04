import React from "react";
import { shallow } from "enzyme";
import GameListVertical from "./GameListVertical";

describe("<GameListVertical />", () => {
  test("should render a list", () => {
    const fetch = jest.fn();
    const rendered = shallow(
      <GameListVertical ids={["one", "two"]} fetch={fetch} />
    );

    expect(rendered.find("List")).toHaveLength(1);
  });

  test("should render a <GameRow /> component for each game", () => {
    const fetch = jest.fn();
    const rendered = shallow(
      <GameListVertical ids={["one", "two"]} fetch={fetch} />
    );
    const list = rendered.find("List").dive();

    expect(list.find("GameRowContainer")).toHaveLength(2);
  });

  test("should fetch games once", () => {
    const fetch = jest.fn();

    shallow(<GameListVertical ids={["one", "two"]} fetch={fetch} />);

    expect(fetch).toBeCalledTimes(1);
  });
});
