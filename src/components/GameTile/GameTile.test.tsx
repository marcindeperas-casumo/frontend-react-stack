import React from "react";
import { mount, shallow } from "enzyme";
import MockStore from "Components/MockStore";
import { launchGame } from "Services/LaunchGameService";
import { GameTile } from "Components/GameTile/GameTile";
import { CURRENCIES } from "Src/constants";
import { setDesktopViewport, setMobileViewport } from "Utils/testUtils";
import { GameTileInMaintenanceContainer as GameTileInMaintenance } from "./GameTileInMaintenanceContainer";
import { gameMock } from "./__mocks__/Game";

jest.mock("../../applicationService/LaunchGameService");

describe("GameTile", () => {
  test("should render GameTileImage", () => {
    const imgixOpts = {
      w: 170,
    };
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2741) FIXME: Property 't' is missing in type '{ game: { readonl... Remove this comment to see the full error message
      <GameTile game={gameMock} imgixOpts={imgixOpts} />
    );
    const renderedGameTileImageProps = rendered.find("GameTileImage").props();

    expect(rendered.find("GameTileImage").length).toBe(1);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'logoBackground' does not exist on type '... Remove this comment to see the full error message
    expect(renderedGameTileImageProps.logoBackground).toBe(
      gameMock.backgroundImage
    );
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'logo' does not exist on type 'HTMLAttrib... Remove this comment to see the full error message
    expect(renderedGameTileImageProps.logo).toBe(gameMock.logo);
    expect(renderedGameTileImageProps.name).toBe(gameMock.name);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'imgixOpts' does not exist on type 'HTMLA... Remove this comment to see the full error message
    expect(renderedGameTileImageProps.imgixOpts).toEqual(imgixOpts);
  });

  test("should add default game-tile ratio class", () => {
    // @ts-expect-error ts-migrate(2741) FIXME: Property 't' is missing in type '{ game: { readonl... Remove this comment to see the full error message
    const rendered = shallow(<GameTile game={gameMock} />);
    expect(rendered.find("Flex").first().hasClass("o-ratio--game-tile")).toBe(
      true
    );
  });

  test("should render GameTileInMaintenance when inMaintenanceMode is false", () => {
    // @ts-expect-error ts-migrate(2741) FIXME: Property 't' is missing in type '{ game: { readonl... Remove this comment to see the full error message
    const rendered = shallow(<GameTile game={gameMock} />);
    expect(rendered.find(GameTileInMaintenance).length).toBe(0);
  });

  test("should not render GameTileInMaintenance when inMaintenanceMode is true", () => {
    const game = { ...gameMock, isInMaintenance: true };
    // @ts-expect-error ts-migrate(2741) FIXME: Property 't' is missing in type '{ game: { isInMai... Remove this comment to see the full error message
    const rendered = shallow(<GameTile game={game} />);

    expect(rendered.find(GameTileInMaintenance)).toHaveLength(1);
  });

  test("should launchGame if component is clicked", () => {
    const rendered = mount(
      <MockStore>
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 't' is missing in type '{ game: { readonl... Remove this comment to see the full error message */}
        <GameTile game={gameMock} />
      </MockStore>
    );

    rendered.find("Flex").first().simulate("click");

    expect(launchGame).toHaveBeenCalledTimes(1);
  });

  test("should render GameTile showing jackpot amount", () => {
    const gameJackpot = {
      jackpot: {
        id: "someID",
        value: {
          amount: 123456789,
          currency: CURRENCIES.EUR,
        },
      },
    };
    const game = {
      ...gameInfo,
      jackpot: gameJackpot.jackpot,
      id: "someCrappyString",
      playBackground: "testbg",
    };
    const t = { play_button_text_game_tile: "Play" };
    setDesktopViewport();
    const rendered = mount(
      <MockStore>
        <GameTile game={game} t={t} />
      </MockStore>
    );
    expect(
      rendered.find(".c-game-tile-container__jackpot span").text()
    ).toContain("€123,456,789");
  });

  test("should render GameTile as mobile but NOT showing jackpot amount since it's for desktop only", () => {
    const gameJackpot = {
      jackpot: {
        id: "someID",
        value: {
          amount: 123456789,
          currency: CURRENCIES.EUR,
        },
      },
    };
    const game = {
      ...gameInfo,
      jackpot: gameJackpot.jackpot,
      id: "someCrappyString",
      playBackground: "testbg",
    };
    const t = { play_button_text_game_tile: "Play" };
    setMobileViewport();
    const rendered = mount(
      <MockStore>
        <GameTile game={game} t={t} />
      </MockStore>
    );
    expect(
      rendered.find(".c-game-tile-container__jackpot span").length
    ).toEqual(0);
  });
});
