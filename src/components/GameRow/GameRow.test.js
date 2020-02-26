import React from "react";
import { shallow } from "enzyme";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowText } from "Components/GameRow/GameRowText";
import { GameRowTrackMoreIcon } from "Components/GameRow/GameRowTrackMoreIcon";
import { GameRowTrackPlayIcon } from "Components/GameRow/GameRowTrackPlayIcon";
import { GameThumb } from "Components/GameThumb";
// import { Roulette as liveCasinoGame } from "Components/LiveCasinoCard/__mocks__";
// import { renderBets } from "Utils";
import { CURRENCIES } from "Src/constants";

describe("<GameRow />", () => {
  let launchGame;
  let game;

  beforeEach(() => {
    launchGame = jest.fn();
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
        onLaunchGame={launchGame}
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
    const rendered = shallow(
      <GameRow game={game} onLaunchGame={launchGame} renderText={renderText} />
    );

    expect(renderText).toHaveBeenCalled();
    expect(rendered.find(GameRowText).length).toBe(1);
  });

  test("renders a play icon if jackpot game", () => {
    const rendered = shallow(
      <GameRow
        game={{ ...game, lobby: "whatever" }}
        onLaunchGame={launchGame}
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
        onLaunchGame={launchGame}
        renderText={() => <GameRowText name={game.name} />}
      />
    );

    expect(rendered.find(GameRowTrackMoreIcon).length).toBe(1);
    expect(rendered.find(GameRowTrackPlayIcon).length).toBe(0);
  });

  test("clicking on the whole row launches the game if Jackpot game", () => {
    const rendered = shallow(
      <GameRow
        game={{ ...game, lobby: "whatever" }}
        onLaunchGame={launchGame}
        renderText={() => <GameRowText name={game.name} />}
      />
    );

    rendered
      .find("FlexBlock")
      .first()
      .simulate("click");

    expect(launchGame).toHaveBeenCalledTimes(1);
  });
});
