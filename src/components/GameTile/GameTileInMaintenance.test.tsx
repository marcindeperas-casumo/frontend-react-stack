import React from "react";
import { shallow } from "enzyme";
import { GameTileInMaintenance } from "Components/GameTile/GameTileInMaintenance";
import { gameMock } from "./__mocks__/Game";

describe("GameTile", () => {
  test("should render GameTileImage", () => {
    const imgixOpts = {
      w: 170,
    };
    const rendered = shallow(
      // @ts-expect-error ts-migrate(2739) FIXME: Type '{ game: { readonly __typename: "Game"; reado... Remove this comment to see the full error message
      <GameTileInMaintenance game={gameMock} imgixOpts={imgixOpts} />
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
    // @ts-expect-error ts-migrate(2739) FIXME: Type '{ game: { readonly __typename: "Game"; reado... Remove this comment to see the full error message
    const rendered = shallow(<GameTileInMaintenance game={gameMock} />);
    expect(rendered.find("Flex").first().hasClass("o-ratio--game-tile")).toBe(
      true
    );
  });
});
