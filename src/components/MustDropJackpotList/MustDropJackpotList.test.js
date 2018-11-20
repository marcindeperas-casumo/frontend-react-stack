import React from "react";
import { shallow } from "enzyme";
import MustDropJackpotList from "Components/MustDropJackpotList/MustDropJackpotList";

describe("<MustDropJackpotList />", () => {
  test("renders a <GameRow /> for each id", () => {
    const ids = ["one", "two", "three"];
    const rendered = shallow(<MustDropJackpotList ids={ids} isLoaded={true} />);

    expect(rendered.find("GameRowContainer").length).toBe(ids.length);
  });

  test("should not render a <GameRow /> if ids is empty", () => {
    const ids = [];
    const rendered = shallow(<MustDropJackpotList ids={ids} isLoaded={true} />);

    expect(rendered.find("GameRowContainer").length).toBe(0);
  });
});
