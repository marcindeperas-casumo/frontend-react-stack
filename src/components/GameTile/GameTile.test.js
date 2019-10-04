import React from "react";
import { mount, shallow } from "enzyme";
import GameTile, {
  IN_MAINTENANCE_CLASS_NAME,
} from "Components/GameTile/GameTile";
import gameInfo from "./__mocks__/Game.json";
import jackpotInfo from "./__mocks__/JackpotGameInfo.json";

describe("GameTile", () => {
  test("should render GameTimeImage", () => {
    const imgixOpts = {
      w: 170,
    };
    const rendered = shallow(
      <GameTile game={gameInfo} imgixOpts={imgixOpts} />
    );
    const renderedGameTileImageProps = rendered.find("GameTileImage").props();

    expect(rendered.find("GameTileImage").length).toBe(1);
    expect(renderedGameTileImageProps.logoBackground).toBe(
      gameInfo.logoBackground
    );
    expect(renderedGameTileImageProps.logo).toBe(gameInfo.logo);
    expect(renderedGameTileImageProps.name).toBe(gameInfo.name);
    expect(renderedGameTileImageProps.imgixOpts).toEqual(imgixOpts);
  });

  test("should not render GameTileOverlay if not isActive", () => {
    const onLaunchGame = jest.fn();
    const rendered = shallow(
      <GameTile game={gameInfo} onLaunchGame={onLaunchGame} />
    );
    expect(rendered.find("GameTileOverlay").length).toBe(0);
  });

  test("should render GameTileOverlay when clicked", () => {
    const onLaunchGame = jest.fn();
    const rendered = shallow(
      <GameTile game={gameInfo} onLaunchGame={onLaunchGame} />
    );
    rendered.simulate("click");

    const renderedGameTileOverlayProps = rendered
      .find("GameTileOverlay")
      .props();

    expect(rendered.find("GameTileOverlay").length).toBe(1);
    expect(renderedGameTileOverlayProps.name).toBe(gameInfo.name);
    expect(renderedGameTileOverlayProps.slug).toBe(gameInfo.slug);
    expect(renderedGameTileOverlayProps.inMaintenanceMode).toBe(
      gameInfo.inMaintenanceMode
    );
    expect(renderedGameTileOverlayProps.onLaunchGame).toBe(onLaunchGame);
  });

  test("should add default game-tile ratio class", () => {
    const rendered = shallow(<GameTile game={gameInfo} />);
    expect(rendered.hasClass("o-ratio--game-tile")).toBe(true);
  });

  test("should not render GameTileJackpot if game.jackpotInfo does not exist", () => {
    const noJackpotInfoGame = { ...gameInfo, jackpotInfo: {} };
    const rendered = shallow(<GameTile game={noJackpotInfoGame} />);
    expect(rendered.find("GameTileJackpot").length).toBe(0);
  });

  test("should not set maintence class when inMaintenanceMode is false", () => {
    const rendered = shallow(<GameTile game={gameInfo} />);
    expect(rendered.hasClass(IN_MAINTENANCE_CLASS_NAME)).toBe(false);
  });

  test("should set maintence class when inMaintenanceMode is true", () => {
    const inMaintenanceModeGame = { ...gameInfo, inMaintenanceMode: true };
    const rendered = shallow(<GameTile game={inMaintenanceModeGame} />);
    expect(rendered.hasClass(IN_MAINTENANCE_CLASS_NAME)).toBe(true);
  });

  test("should render gameOverlay if isOverlayAlwaysActive is true", () => {
    const rendered = shallow(
      <GameTile game={gameInfo} isOverlayAlwaysActive />
    );
    expect(rendered.find("GameTileOverlay").length).toBe(1);
  });

  test("should launchGame if isOverlayAlwaysActive is true and component is clicked", () => {
    const onLaunchGame = jest.fn();
    const rendered = mount(
      <GameTile
        game={gameInfo}
        onLaunchGame={onLaunchGame}
        isOverlayAlwaysActive
      />
    );
    rendered.find("PlayIcon").simulate("click");

    expect(onLaunchGame).toHaveBeenCalled();
  });
});
