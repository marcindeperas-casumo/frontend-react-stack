import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import React from "react";
import game from "Components/GameTile/__mocks__/Game.json";
import jackpots from "Components/Jackpots/__mocks__/response.jackpots.mock";
import { Roulette as liveCasinoGame } from "Components/LiveCasinoCard/__mocks__";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowText } from "Components/GameRow/GameRowText";
import { GameRowSearchText } from "Components/GameRow/GameRowSearchText";

const stories = storiesOf("GameRow", module);
stories.addDecorator(withKnobs);
const gonzosQuest = "gonzos-quest";
const jackpot = jackpots[0];

// __FIX__ Remove this once the GameRow is using the "liveCasinoLobby" instead of the deprecated "lobby"
// @ts-expect-error ts-migrate(2339) FIXME: Property 'lobby' does not exist on type '{ backgro... Remove this comment to see the full error message
liveCasinoGame.lobby = liveCasinoGame.liveCasinoLobby;

const propsDefault = {
  game: game,
  onLaunchGame: action(gonzosQuest),
  renderText: () => <GameRowText name={game.name} />,
};
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ game: { name: string; slug: string; backgr... Remove this comment to see the full error message
stories.add("Default", () => <GameRow {...propsDefault} />);

const propsShowingJackpot = {
  game: { ...game, jackpot },
  renderText: () => (
    // @ts-expect-error ts-migrate(2322) FIXME: Type '{ id: string; gameProvider: string; value: {... Remove this comment to see the full error message
    <GameRowText name={game.name} jackpot={jackpot} locale="en" />
  ),
  onLaunchGame: action(gonzosQuest),
};
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ game: { jackpot: { id: string; gameProvide... Remove this comment to see the full error message
stories.add("Showing a Jackpot", () => <GameRow {...propsShowingJackpot} />);

const propsShowingLiveCasino = {
  game: liveCasinoGame,
  onLaunchGame: action("casumo-roulette"),
  renderText: () => (
    <GameRowText
      name={liveCasinoGame.name}
      bets={liveCasinoGame.liveCasinoLobby.bets}
    />
  ),
};
stories.add("Showing a Live Casino", () => (
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ game: { backgroundImage: string; id: strin... Remove this comment to see the full error message
  <GameRow {...propsShowingLiveCasino} />
));

const propsSearchWithMatch = {
  game,
  onLaunchGame: action(gonzosQuest),
  renderText: () => (
    <GameRowSearchText
      name={game.name}
      isInMaintenance={game.isInMaintenance}
      search={{ query: "gon", highlightSearchQuery: true }}
    />
  ),
};
// @ts-expect-error ts-migrate(2322) FIXME: Type '{ game: { name: string; slug: string; backgr... Remove this comment to see the full error message
stories.add("Search with match", () => <GameRow {...propsSearchWithMatch} />);

const propsSearchWithNoMatch = {
  game,
  onLaunchGame: action(gonzosQuest),
  renderText: () => (
    <GameRowSearchText
      name={game.name}
      isInMaintenance={game.isInMaintenance}
      search
    />
  ),
};
stories.add("Search with no match", () => (
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ game: { name: string; slug: string; backgr... Remove this comment to see the full error message
  <GameRow {...propsSearchWithNoMatch} />
));

const isInMaintenance = boolean("In maintenance mode", true);
const propsGameInMaintenance = {
  game: { ...game, isInMaintenance },
  onLaunchGame: action(gonzosQuest),
  renderText: () => (
    <GameRowSearchText
      name={game.name}
      isInMaintenance={isInMaintenance}
      search
    />
  ),
};
stories.add("Showing Games in maintenance mode", () => (
  // @ts-expect-error ts-migrate(2322) FIXME: Type '{ game: { isInMaintenance: any; name: string... Remove this comment to see the full error message
  <GameRow {...propsGameInMaintenance} />
));
