import React from "react";
import { shallow } from "enzyme";

import GameTileOverlay from "Components/GameTile/GameTileOverlay";
import gameInfo from "./__mocks__/Game.json";

describe("GameTileOverlay", () => {
  test("should render component", () => {
    const rendered = shallow(<GameTileOverlay {...gameInfo} />);
    expect(rendered.exists()).not.toBeNull();
  });

  test("should render PlayAction if not in maintenance mode", () => {
    const rendered = shallow(<GameTileOverlay {...gameInfo} />);
    expect(rendered.find("PlayAction").length).toBe(1);
  });

  test("should render TemporaryUnavailable if not in maintenance mode", () => {
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} inMaintenanceMode={true} />
    );
    expect(rendered.find("TemporaryUnavailable").length).toBe(1);
  });
});
