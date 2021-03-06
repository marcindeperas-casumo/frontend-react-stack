import React from "react";
import { mount } from "enzyme";
import { setMobileViewport } from "Utils/testUtils";
import { GameThumb } from "Components/GameThumb";
import { CURRENCIES } from "Src/constants";
import MockStore from "Components/MockStore";
import { GameRow } from "./GameRow";
import { GameRowText } from "./GameRowText";
import { GameRowTrackMoreIcon } from "./GameRowTrackMoreIcon";
import { GameRowTrackPlayIcon } from "./GameRowTrackPlayIcon";

describe("<GameRow />", () => {
  let game;

  beforeEach(() => {
    setMobileViewport();
    game = {
      slug: "foo-bar",
      name: "Foo Bar",
      logo: "http://foo.com/logo.jpg",
      backgroundImage: "http://foo.com/logo-background.jpg",
      jackpot: {
        id: "netent-starburst",
        value: {
          currency: CURRENCIES.EUR,
          amount: 10,
        },
      },
    };
  });

  test("renders a GameThumb for the component", () => {
    const rendered = mount(
      <MockStore>
        <GameRow
          game={game}
          renderText={() => <GameRowText name={game.name} />}
        />
      </MockStore>
    );
    const thumbnail = rendered.find(GameThumb);
    const thumbnailProps = thumbnail.length ? thumbnail.props() : {};

    expect(thumbnail.length).toBe(1);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'src' does not exist on type '{}'.
    expect(thumbnailProps.src).toBe(game.backgroundImage);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'mark' does not exist on type '{}'.
    expect(thumbnailProps.mark).toBe(game.logo);
    // @ts-expect-error ts-migrate(2339) FIXME: Property 'alt' does not exist on type '{}'.
    expect(thumbnailProps.alt).toBe(game.name);
  });

  test("calls renderText render prop", () => {
    const renderText = jest.fn(() => <GameRowText name={game.name} />);
    const rendered = mount(
      <MockStore>
        <GameRow game={game} renderText={renderText} />
      </MockStore>
    );

    expect(renderText).toHaveBeenCalled();
    expect(rendered.find(GameRowText).length).toBe(1);
  });

  test("renders a play icon if jackpot game", () => {
    const rendered = mount(
      <MockStore>
        <GameRow
          game={{ ...game, lobby: "whatever" }}
          renderText={() => <GameRowText name={game.name} />}
        />
      </MockStore>
    );

    expect(rendered.find(GameRowTrackPlayIcon).length).toBe(1);
    expect(rendered.find(GameRowTrackMoreIcon).length).toBe(0);
  });

  test("doesnt renders a More info icon if not a jackpot game", () => {
    const rendered = mount(
      <MockStore>
        <GameRow
          game={game}
          renderText={() => <GameRowText name={game.name} />}
        />
      </MockStore>
    );

    expect(rendered.find(GameRowTrackMoreIcon).length).toBe(0);
    expect(rendered.find(GameRowTrackPlayIcon).length).toBe(0);
  });
});
