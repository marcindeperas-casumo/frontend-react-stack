import React from "react";
import { shallow } from "enzyme";
import GameTileOverlay, {
  IN_MAINTENANCE_CLASS_NAME,
  ALWAYS_ACTIVE_CLASS_NAME,
} from "Components/GameTile/GameTileOverlay";
import gameInfo from "./__mocks__/Game.json";

describe("GameTileOverlay", () => {
  test("should render PlayAction if not in maintenance mode", () => {
    const spy = jest.fn();
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} onLaunchGame={spy} />
    );
    expect(rendered.find("PlayAction").length).toBe(1);
    expect(rendered.find("PlayAction").prop("onLaunchGame")).toEqual(spy);
  });

  test("should not set maintence class when inMaintenanceMode is false", () => {
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} inMaintenanceMode={false} />
    );
    expect(rendered.hasClass(IN_MAINTENANCE_CLASS_NAME)).toBe(false);
  });

  test("should set maintence class when inMaintenanceMode is true", () => {
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} inMaintenanceMode={true} />
    );
    expect(rendered.hasClass(IN_MAINTENANCE_CLASS_NAME)).toBe(true);
  });

  test("should render TemporaryUnavailable if in maintenance mode", () => {
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} inMaintenanceMode={true} />
    );
    expect(rendered.find("TemporaryUnavailable").length).toBe(1);
  });

  test("should set active class when alwaysActive is true", () => {
    const rendered = shallow(<GameTileOverlay {...gameInfo} alwaysActive />);
    expect(rendered.hasClass(ALWAYS_ACTIVE_CLASS_NAME)).toBe(true);
  });

  test("should set maintenance class when inMaintenanceMode is true and alwaysActive is true", () => {
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} alwaysActive inMaintenanceMode />
    );
    expect(rendered.hasClass(IN_MAINTENANCE_CLASS_NAME)).toBe(true);
    expect(rendered.hasClass(ALWAYS_ACTIVE_CLASS_NAME)).toBe(false);
  });

  test("should only show play icon on overlay if alwaysActive is true", () => {
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} alwaysActive={true} />
    );

    expect(rendered.find("PlayAction").length).toBe(1);
    expect(rendered.find("Text").hasClass("u-visibility--hidden")).toBe(true);
    expect(rendered.find("MoreIcon").length).toBe(0);
  });

  test("should show play icon along with title and more info icon on overlay if alwaysActive is false", () => {
    const rendered = shallow(
      <GameTileOverlay {...gameInfo} alwaysActive={false} />
    );

    expect(rendered.find("PlayAction").length).toBe(1);
    expect(rendered.find("Text").length).toBe(1);
    expect(rendered.find("MoreIcon").length).toBe(1);
  });
});
