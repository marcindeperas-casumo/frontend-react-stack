import React from "react";
import { shallow } from "enzyme";
import ContinuePlayingCard from "Components/ContinuePlayingCard/ContinuePlayingCard";

describe("ContinuePlayingCard", () => {
  test("should render gameTile with isOverlayEnabled set to false", () => {
    const rendered = shallow(<ContinuePlayingCard />);

    expect(rendered.find("GameTile").length).toBe(1);
  });
});
