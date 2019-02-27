import React from "react";
import { shallow } from "enzyme";
import GameTileWithActiveOverlay from "Components/GameTileWithActiveOverlay/GameTileWithActiveOverlay";
import gameInfo from "Components/GameTile/__mocks__/Game.json";

describe("GameTileWithActiveOverlay", () => {
  test("should render gameTile with isOverlayActive set to false", () => {
    const rendered = shallow(<GameTileWithActiveOverlay game={gameInfo} />);

    expect(rendered.find("GameTile").length).toBe(1);
    expect(rendered.find("GameTile").prop("isOverlayActive")).toBe(false);
  });
});
