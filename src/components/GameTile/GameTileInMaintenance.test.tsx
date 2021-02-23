import React from "react";
import { shallow } from "enzyme";
import { GameTileInMaintenance } from "Components/GameTile/GameTileInMaintenance";
import gameInfo from "./__mocks__/Game.json";

describe("GameTile", () => {
  test("should render GameTileImage", () => {
    const imgixOpts = {
      w: 170,
    };
    const rendered = shallow(
      <GameTileInMaintenance game={gameInfo} imgixOpts={imgixOpts} />
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
    const rendered = shallow(<GameTileInMaintenance game={gameInfo} />);
    expect(
      rendered
        .find("Flex")
        .first()
        .hasClass("o-ratio--game-tile")
    ).toBe(true);
  });
});
