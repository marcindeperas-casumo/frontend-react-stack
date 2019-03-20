import React from "react";
import { shallow } from "enzyme";
import GameRow from "Components/GameRow/GameRow";
import liveCasinoGame from "Components/LiveCasinoCard/__mocks__/Roulette.json";
import { renderBets } from "Utils";

describe("<GameRow />", () => {
  let rendered;
  let launchGame;
  let game;

  beforeEach(() => {
    launchGame = jest.fn();
    game = {
      slug: "foo-bar",
      name: "Foo Bar",
      logo: "http://foo.com/logo.jpg",
      logoBackground: "http://foo.com/logo-background.jpg",
      jackpotInfo: {
        formattedJackpotAmount: "€ 1,000,000",
      },
    };
    rendered = shallow(<GameRow game={game} onLaunchGame={launchGame} />);
  });

  test("renders a GameThumb for the component", () => {
    const thumbnail = rendered.find("GameThumb");
    const thumbnailProps = thumbnail.length ? thumbnail.props() : {};

    expect(thumbnail.length).toBe(1);
    expect(thumbnailProps.src).toBe(game.logoBackground);
    expect(thumbnailProps.mark).toBe(game.logo);
    expect(thumbnailProps.alt).toBe(game.name);
  });

  test("renders the formatted jackpot amount", () => {
    expect(rendered.html()).toMatch(game.jackpotInfo.formattedJackpotAmount);
  });

  test("renders a play icon", () => {
    const playIcon = rendered.find("PlayIcon");

    expect(playIcon.length).toBe(1);
  });

  test("clicking on the whole row launches the game", () => {
    rendered
      .find("Flex")
      .first()
      .simulate("click");

    expect(launchGame.mock.calls.length).toBe(1);
  });

  test("should render betsLevels if LiveCasino game", () => {
    game = liveCasinoGame;
    rendered = shallow(
      <GameRow game={liveCasinoGame} onLaunchGame={launchGame} />
    );

    expect(rendered.html()).toMatch(renderBets(game.lobby.bets));
  });
});
