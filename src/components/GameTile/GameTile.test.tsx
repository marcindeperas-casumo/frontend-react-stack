import React from "react";
import { mount, shallow } from "enzyme";
import MockStore from "Components/MockStore";
import { launchGame } from "Services/LaunchGameService";
import { GameTile } from "./GameTile";
import { GameTileInMaintenanceContainer as GameTileInMaintenance } from "./GameTileInMaintenanceContainer";
import gameInfo from "./__mocks__/Game.json";

jest.mock("../../applicationService/LaunchGameService");

describe("GameTile", () => {
  test("should render GameTileImage", () => {
    const imgixOpts = {
      w: 170,
    };
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; slug: string; backgroundImag... Remove this comment to see the full error message
      <GameTile game={gameInfo} imgixOpts={imgixOpts} />
    );
    const renderedGameTileImageProps = rendered.find("GameTileImage").props();

    expect(rendered.find("GameTileImage").length).toBe(1);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'logoBackground' does not exist on type '... Remove this comment to see the full error message
    expect(renderedGameTileImageProps.logoBackground).toBe(
      gameInfo.backgroundImage
    );
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'logo' does not exist on type 'HTMLAttrib... Remove this comment to see the full error message
    expect(renderedGameTileImageProps.logo).toBe(gameInfo.logo);
    expect(renderedGameTileImageProps.name).toBe(gameInfo.name);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'imgixOpts' does not exist on type 'HTMLA... Remove this comment to see the full error message
    expect(renderedGameTileImageProps.imgixOpts).toEqual(imgixOpts);
  });

  test("should add default game-tile ratio class", () => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; slug: string; backgroundImag... Remove this comment to see the full error message
    const rendered = shallow(<GameTile game={gameInfo} />);
    expect(rendered.find("Flex").first().hasClass("o-ratio--game-tile")).toBe(
      true
    );
  });

  test("should render GameTileInMaintenance when inMaintenanceMode is false", () => {
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; slug: string; backgroundImag... Remove this comment to see the full error message
    const rendered = shallow(<GameTile game={gameInfo} />);
    expect(rendered.find(GameTileInMaintenance).length).toBe(0);
  });

  test("should not render GameTileInMaintenance when inMaintenanceMode is true", () => {
    const game = { ...gameInfo, isInMaintenance: true };
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ isInMaintenance: boolean; name: string; sl... Remove this comment to see the full error message
    const rendered = shallow(<GameTile game={game} />);

    expect(rendered.find(GameTileInMaintenance)).toHaveLength(1);
  });

  test("should launchGame if component is clicked", () => {
    const rendered = mount(
      <MockStore>
        {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ name: string; slug: string; backgroundImag... Remove this comment to see the full error message */}
        <GameTile game={gameInfo} />
      </MockStore>
    );

    rendered.find("Flex").first().simulate("click");

    expect(launchGame).toHaveBeenCalledTimes(1);
  });
});
