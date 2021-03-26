import React from "react";
import { shallow } from "enzyme";
import { GameTileInMaintenance } from "./GameTileInMaintenance";
import GameTileImage from "./GameTileImage";
import { gameMock } from "./__mocks__/Game";

describe("GameTile", () => {
  test("should render GameTileImage", () => {
    const imgixOpts = {
      w: 170,
    };
    const rendered = shallow(
      <GameTileInMaintenance
        game={gameMock}
        imgixOpts={imgixOpts}
        temporaryUnavailableText="Temporary Unavailable"
      />
    );
    const renderedGameTileImageProps = rendered.find(GameTileImage).props();

    expect(rendered.find(GameTileImage).length).toBe(1);
    expect(renderedGameTileImageProps.logoBackground).toBe(
      gameMock.backgroundImage
    );
    expect(renderedGameTileImageProps.logo).toBe(gameMock.logo);
    expect(renderedGameTileImageProps.name).toBe(gameMock.name);
    expect(renderedGameTileImageProps.imgixOpts).toEqual(imgixOpts);
  });

  test("should add default game-tile ratio class", () => {
    const rendered = shallow(
      <GameTileInMaintenance
        game={gameMock}
        temporaryUnavailableText="Temporary Unavailable"
      />
    );
    expect(rendered.find("Flex").first().hasClass("o-ratio--game-tile")).toBe(
      true
    );
  });
});
