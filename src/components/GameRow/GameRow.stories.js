// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import game from "Components/GameTile/__mocks__/Game.json";
import jackpotInfo from "Components/GameTile/__mocks__/JackpotGameInfo.json";
import liveCasinoGame from "Components/LiveCasinoCard/__mocks__/Roulette.json";
import MockStore from "Components/MockStore";
import { GameRow } from "Components/GameRow/GameRow";
import { GameRowContainer } from "Components/GameRow/GameRowContainer";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("GameRow", module);

if (isNotChromatic) {
  stories.add("Default (Connected)", () => (
    <MockStore>
      <GameRowContainer id="hall-of-gods" />
    </MockStore>
  ));
}

stories.add("Default", () => (
  <GameRow game={game} onLaunchGame={action("gonzos-quest")} />
));

stories.add("With Jackpot", () => (
  <GameRow
    game={{ ...game, jackpotInfo }}
    onLaunchGame={action("gonzos-quest")}
  />
));

stories.add("Live Casino", () => (
  <GameRow game={liveCasinoGame} onLaunchGame={action("casumo-roulette")} />
));
