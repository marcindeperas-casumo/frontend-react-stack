// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import game from "Components/GameTile/__mocks__/Game.json";
import jackpots from "Components/Jackpots/__mocks__/response.jackpots.mock.js";
import liveCasinoGame from "Components/LiveCasinoCard/__mocks__/Roulette.json";
import { GameRow } from "Components/GameRow/GameRow";

const stories = storiesOf("GameRow", module);
const gonzosQuest = "gonzos-quest";
const jackpot = jackpots[0];

stories.add("Default", () => (
  <GameRow game={game} onLaunchGame={action(gonzosQuest)} />
));

stories.add("Default with Jackpot", () => (
  <GameRow game={{ ...game, jackpot }} onLaunchGame={action(gonzosQuest)} />
));

stories.add("Default with Live Casino", () => (
  <GameRow game={liveCasinoGame} onLaunchGame={action("casumo-roulette")} />
));

stories.add("Search with match", () => (
  <GameRow
    game={game}
    onLaunchGame={action(gonzosQuest)}
    search={{ query: "gon", highlightSearchQuery: true }}
  />
));

stories.add("Search with no match", () => (
  <GameRow game={game} onLaunchGame={action(gonzosQuest)} search />
));
