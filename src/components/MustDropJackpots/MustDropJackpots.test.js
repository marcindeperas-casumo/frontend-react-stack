import React from "react";
import { shallow } from "enzyme";
import MustDropJackpots from "Components/MustDropJackpots/MustDropJackpots";

describe("<MustDropJackpots />", () => {
  test("renders a <GameRow /> for each id", () => {
    const ids = ["one", "two", "three"];
    const rendered = shallow(<MustDropJackpots ids={ids} isLoaded={true} />);

    expect(rendered.find("GameRowContainer").length).toBe(ids.length);
  });

  test("should not render a <GameRow /> if ids is empty", () => {
    const ids = [];
    const rendered = shallow(<MustDropJackpots ids={ids} isLoaded={true} />);

    expect(rendered.find("GameRowContainer").length).toBe(0);
  });
});
