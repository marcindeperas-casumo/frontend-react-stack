// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import game from "Components/GameTile/__mocks__/Game.json";
import jackpots from "Components/Jackpots/__mocks__/response.jackpots.mock.js";
import { Roulette as liveCasinoGame } from "Components/LiveCasinoCard/__mocks__";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowText } from "Components/GameRow/GameRowText";
import { GameRowSearchText } from "Components/GameRow/GameRowSearchText";

const stories = storiesOf("GameRow", module);
const gonzosQuest = "gonzos-quest";
const jackpot = jackpots[0];

// __FIX__ Remove this once the GameRow is using the "liveCasinoLobby" instead of the deprecated "lobby"
liveCasinoGame.lobby = liveCasinoGame.liveCasinoLobby;

stories.add("Default", () => (
  <GameRow
    game={game}
    onLaunchGame={action(gonzosQuest)}
    renderText={() => <GameRowText name={game.name} />}
  />
));

stories.add("Showing a Jackpot", () => (
  <GameRow
    game={{ ...game, jackpot }}
    renderText={() => (
      <GameRowText name={game.name} jackpot={jackpot} locale="en" />
    )}
    onLaunchGame={action(gonzosQuest)}
  />
));

stories.add("Showing a Live Casino", () => (
  <GameRow
    game={liveCasinoGame}
    onLaunchGame={action("casumo-roulette")}
    renderText={() => (
      <GameRowText
        name={liveCasinoGame.name}
        bets={liveCasinoGame.liveCasinoLobby.bets}
      />
    )}
  />
));

stories.add("Search with match", () => (
  <GameRow
    game={game}
    onLaunchGame={action(gonzosQuest)}
    renderText={() => (
      <GameRowSearchText
        name={game.name}
        isInMaintenance={game.isInMaintenance}
        search={{ query: "gon", highlightSearchQuery: true }}
      />
    )}
  />
));

stories.add("Search with no match", () => (
  <GameRow
    game={game}
    onLaunchGame={action(gonzosQuest)}
    renderText={() => (
      <GameRowSearchText
        name={game.name}
        isInMaintenance={game.isInMaintenance}
        search
      />
    )}
  />
));
