import React from "react";
import { shallow } from "enzyme";

import PlayAction from "Components/GameTile/PlayAction";
import gameInfo from "./__mocks__/Game.json";

describe("PlayAction", () => {
  test("should render component", () => {
    const spy = jest.fn();
    const rendered = shallow(<PlayAction onLaunchGame={spy} />);
    expect(rendered.exists()).not.toBeNull();
  });

  test("should call onLaunchGame when clicked", () => {
    const spy = jest.fn();
    const rendered = shallow(<PlayAction onLaunchGame={spy} />);
    expect(spy).toHaveBeenCalledTimes(0);
    rendered.simulate("click");
    expect(spy).toHaveBeenCalledTimes(1);
  });
});
