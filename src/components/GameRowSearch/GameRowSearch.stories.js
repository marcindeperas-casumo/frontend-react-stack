// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import game from "Components/GameTile/__mocks__/Game.json";
import jackpotInfo from "Components/GameTile/__mocks__/JackpotGameInfo.json";
import liveCasinoGame from "Components/LiveCasinoCard/__mocks__/Roulette.json";
import MockStore from "Components/MockStore";
import GameRowSearch from "Components/GameRowSearch/GameRowSearch";
import GameRowSearchContainer from "Components/GameRowSearch";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("GameRowSearch", module);

if (isNotChromatic) {
  stories.add(
    "Default (Connected)",
    () => (
      <MockStore>
        <GameRowSearchContainer id="hall-of-gods" />
      </MockStore>
    ),
    info({ text: "Default" })
  );
}

stories.add(
  "Default",
  () => (
    <GameRowSearch
      game={game}
      onLaunchGame={action("gonzos-quest")}
      id="gonzos-quest"
    />
  ),
  info({ text: "Default" })
);

stories.add(
  "Jackpot Game",
  () => (
    <GameRowSearch
      game={{ ...game, lobby: "test" }}
      onLaunchGame={action("gonzos-quest")}
      id="gonzos-quest"
    />
  ),
  info({ text: "Jackpot Game" })
);
