import React from "react";
import { shallow } from "enzyme";
import { GameThumb } from "Components/GameThumb";
import { CURRENCIES } from "Src/constants";
import { GameRow } from "./GameRow";
import { GameRowText } from "./GameRowText";
import { GameRowTrackMoreIcon } from "./GameRowTrackMoreIcon";
import { GameRowTrackPlayIcon } from "./GameRowTrackPlayIcon";

describe("<GameRow />", () => {
  let game;

  beforeEach(() => {
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
    const rendered = shallow(
      <GameRow
        game={game}
        renderText={() => <GameRowText name={game.name} />}
      />
    );
    const thumbnail = rendered.find(GameThumb);
    const thumbnailProps = thumbnail.length ? thumbnail.props() : {};

    expect(thumbnail.length).toBe(1);
    expect(thumbnailProps.src).toBe(game.backgroundImage);
    expect(thumbnailProps.mark).toBe(game.logo);
    expect(thumbnailProps.alt).toBe(game.name);
  });

  test("calls renderText render prop", () => {
    const renderText = jest.fn(() => <GameRowText name={game.name} />);
    const rendered = shallow(<GameRow game={game} renderText={renderText} />);

    expect(renderText).toHaveBeenCalled();
    expect(rendered.find(GameRowText).length).toBe(1);
  });

  test("renders a play icon if jackpot game", () => {
    const rendered = shallow(
      <GameRow
        game={{ ...game, lobby: "whatever" }}
        renderText={() => <GameRowText name={game.name} />}
      />
    );

    expect(rendered.find(GameRowTrackPlayIcon).length).toBe(1);
    expect(rendered.find(GameRowTrackMoreIcon).length).toBe(0);
  });

  test("renders a More info icon if not a jackpot game", () => {
    const rendered = shallow(
      <GameRow
        game={game}
        renderText={() => <GameRowText name={game.name} />}
      />
    );

    expect(rendered.find(GameRowTrackMoreIcon).length).toBe(1);
    expect(rendered.find(GameRowTrackPlayIcon).length).toBe(0);
  });
});
