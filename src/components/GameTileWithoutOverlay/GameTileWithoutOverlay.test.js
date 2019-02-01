import React from "react";
import { shallow } from "enzyme";
import GameTileWithoutOverlay from "Components/GameTileWithoutOverlay/GameTileWithoutOverlay";
import gameInfo from "Components/GameTile/__mocks__/Game.json";

describe("GameTileWithoutOverlay", () => {
  test("should render gameTile with isOverlayEnabled set to false", () => {
    const rendered = shallow(<GameTileWithoutOverlay game={gameInfo} />);

    expect(rendered.find("GameTile").length).toBe(1);
    expect(rendered.find("GameTile").prop("isOverlayEnabled")).toBe(false);
  });
});
