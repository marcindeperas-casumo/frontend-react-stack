import React from "react";
import { shallow } from "enzyme";
import PlayAction from "Components/GameTile/PlayAction";

describe("PlayAction", () => {
  test("should call onLaunchGame when clicked", () => {
    const spy = jest.fn();
    const rendered = shallow(<PlayAction onLaunchGame={spy} />);

    expect(spy).toHaveBeenCalledTimes(0);

    rendered.simulate("click");

    expect(spy).toHaveBeenCalledTimes(1);
  });
});
