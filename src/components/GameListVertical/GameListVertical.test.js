import React from "react";
import { shallow } from "enzyme";
import { GameRow } from "Components/GameRow";
import { GameListVertical } from "./GameListVertical";

describe("<GameListVertical />", () => {
  test("should render a <GameRow /> component for each game", () => {
    const fetch = jest.fn();
    const rendered = shallow(
      <GameListVertical ids={["one", "two"]} fetch={fetch} />
    );

    expect(rendered.find(GameRow)).toHaveLength(2);
  });

  test("should fetch games once", () => {
    const fetch = jest.fn();

    shallow(<GameListVertical ids={["one", "two"]} fetch={fetch} />);

    expect(fetch).toBeCalledTimes(1);
  });
});
