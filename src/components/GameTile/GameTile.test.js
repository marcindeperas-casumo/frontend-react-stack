import React from "react";
import { mount, shallow } from "enzyme";
import MockStore from "Components/MockStore";
import { GameTile } from "./GameTile";
import { GameTileInMaintenance } from "./GameTileInMaintenance";
import gameInfo from "./__mocks__/Game.json";

describe("GameTile", () => {
  test("should render GameTileImage", () => {
    const imgixOpts = {
      w: 170,
    };
    const rendered = shallow(
      <GameTile game={gameInfo} imgixOpts={imgixOpts} />
    );
    const renderedGameTileImageProps = rendered.find("GameTileImage").props();

    expect(rendered.find("GameTileImage").length).toBe(1);
    expect(renderedGameTileImageProps.logoBackground).toBe(
      gameInfo.backgroundImage
    );
    expect(renderedGameTileImageProps.logo).toBe(gameInfo.logo);
    expect(renderedGameTileImageProps.name).toBe(gameInfo.name);
    expect(renderedGameTileImageProps.imgixOpts).toEqual(imgixOpts);
  });

  test("should add default game-tile ratio class", () => {
    const rendered = shallow(<GameTile game={gameInfo} />);
    expect(
      rendered
        .find("Flex")
        .first()
        .hasClass("o-ratio--game-tile")
    ).toBe(true);
  });

  test("should render GameTileInMaintenance when inMaintenanceMode is false", () => {
    const rendered = shallow(<GameTile game={gameInfo} />);
    expect(rendered.find(GameTileInMaintenance).length).toBe(0);
  });

  test("should not render GameTileInMaintenance when inMaintenanceMode is true", () => {
    const game = { ...gameInfo, isInMaintenance: true };
    const rendered = shallow(<GameTile game={game} />);

    expect(rendered.find(GameTileInMaintenance)).toHaveLength(1);
  });

  test("should launchGame if component is clicked", () => {
    const onLaunchGame = jest.fn();
    const rendered = mount(
      <MockStore>
        <GameTile game={gameInfo} onLaunchGame={onLaunchGame} />
      </MockStore>
    );

    rendered
      .find("Flex")
      .first()
      .simulate("click");

    expect(onLaunchGame).toHaveBeenCalled();
  });
});
