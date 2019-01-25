import React from "react";
import { shallow } from "enzyme";
import GameTileWithoutOverlay from "Components/GameTileWithoutOverlay/GameTileWithoutOverlay";

describe("GameTileWithoutOverlay", () => {
  test("should render gameTile with isOverlayEnabled set to false", () => {
    const rendered = shallow(<GameTileWithoutOverlay />);

    expect(rendered.find("GameTile").length).toBe(1);
    expect(rendered.find("GameTile").prop("isOverlayEnabled")).toBeFalsy();
  });
});
