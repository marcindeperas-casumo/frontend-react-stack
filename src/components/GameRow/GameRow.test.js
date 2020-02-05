import React from "react";
import { shallow } from "enzyme";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowSearchText } from "Components/GameRow/GameRowSearchText";
import { GameRowText } from "Components/GameRow/GameRowText";
import { GameRowTrackMoreIcon } from "Components/GameRow/GameRowTrackMoreIcon";
import { GameRowTrackPlayIcon } from "Components/GameRow/GameRowTrackPlayIcon";
import { GameThumb } from "Components/GameThumb";
import liveCasinoGame from "Components/LiveCasinoCard/__mocks__/Roulette.json";
import { renderBets } from "Utils";
import { CURRENCIES } from "Src/constants";

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
      backgroundImage: "http://foo.com/logo-background.jpg",
      jackpot: {
        id: "netent-starburst",
        value: {
          currency: CURRENCIES.EUR,
          amount: 10,
        },
      },
    };
    rendered = shallow(<GameRow game={game} onLaunchGame={launchGame} />);
  });

  test("renders a GameThumb for the component", () => {
    const thumbnail = rendered.find(GameThumb);
    const thumbnailProps = thumbnail.length ? thumbnail.props() : {};

    expect(thumbnail.length).toBe(1);
    expect(thumbnailProps.src).toBe(game.backgroundImage);
    expect(thumbnailProps.mark).toBe(game.logo);
    expect(thumbnailProps.alt).toBe(game.name);
  });

  test("renders a play icon if jackpot game", () => {
    rendered = shallow(
      <GameRow
        game={{ ...game, lobby: "whatever" }}
        onLaunchGame={launchGame}
      />
    );

    expect(rendered.find(GameRowTrackPlayIcon).length).toBe(1);
    expect(rendered.find(GameRowTrackMoreIcon).length).toBe(0);
  });

  test("renders a More info icon if not a jackpot game", () => {
    rendered = shallow(<GameRow game={game} onLaunchGame={launchGame} />);

    expect(rendered.find(GameRowTrackMoreIcon).length).toBe(1);
    expect(rendered.find(GameRowTrackPlayIcon).length).toBe(0);
  });

  test("clicking on the whole row launches the game if Jackpot game", () => {
    rendered = shallow(
      <GameRow
        game={{ ...game, lobby: "whatever" }}
        onLaunchGame={launchGame}
      />
    );

    rendered
      .find("FlexBlock")
      .first()
      .simulate("click");

    expect(launchGame).toHaveBeenCalledTimes(1);
  });

  test("should render betsLevels if LiveCasino game", () => {
    game = liveCasinoGame;
    rendered = shallow(
      <GameRow game={liveCasinoGame} onLaunchGame={launchGame} />
    );

    expect(rendered.html()).toMatch(renderBets(game.lobby.bets));
  });

  test("should render the GameRowTextSearch if used for search", () => {
    rendered = shallow(
      <GameRow game={game} onLaunchGame={launchGame} search />
    );

    expect(rendered.find(GameRowSearchText)).toHaveLength(1);
    expect(rendered.find(GameRowText)).toHaveLength(0);
  });

  test("should render the GameRowText if default GameRow", () => {
    rendered = shallow(<GameRow game={game} onLaunchGame={launchGame} />);

    expect(rendered.find(GameRowSearchText)).toHaveLength(0);
    expect(rendered.find(GameRowText)).toHaveLength(1);
  });
});
