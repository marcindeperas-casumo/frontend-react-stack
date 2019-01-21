import React from "react";
import { shallow } from "enzyme";
import GameRowSearch from "Components/GameRowSearch/GameRowSearch";

describe("<GameRowSearch />", () => {
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
    };
  });

  test("renders a GameThumb for the component", () => {
    rendered = shallow(
      <GameRowSearch
        game={{ ...game, lobby: "whatever" }}
        onLaunchGame={launchGame}
      />
    );

    const thumbnail = rendered.find("GameThumb");
    const thumbnailProps = thumbnail.length ? thumbnail.props() : {};

    expect(thumbnail.length).toBe(1);
    expect(thumbnailProps.src).toBe(game.logoBackground);
    expect(thumbnailProps.mark).toBe(game.logo);
    expect(thumbnailProps.alt).toBe(game.name);
  });

  test("renders a play icon if jackpot game", () => {
    rendered = shallow(
      <GameRowSearch
        game={{ ...game, lobby: "whatever" }}
        onLaunchGame={launchGame}
      />
    );

    const playIcon = rendered.find("RenderPlayIcon");

    expect(playIcon.length).toBe(1);
  });

  test("renders a More info icon if not a jackpot game", () => {
    rendered = shallow(<GameRowSearch game={game} onLaunchGame={launchGame} />);

    const moreIcon = rendered.find("RenderMoreIcon");

    expect(moreIcon.length).toBe(1);
  });

  test("clicking on the whole row launches the game if Jackpot game", () => {
    rendered = shallow(
      <GameRowSearch
        game={{ ...game, lobby: "whatever" }}
        onLaunchGame={launchGame}
        id={game.slug}
      />
    );

    rendered
      .find("FlexBlock")
      .first()
      .simulate("click");

    expect(launchGame).toHaveBeenCalledTimes(1);
  });
});
