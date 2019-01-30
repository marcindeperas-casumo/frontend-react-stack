// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import game from "Components/GameTile/__mocks__/Game.json";
import MockStore from "Components/MockStore";
import GameRowSearch from "Components/GameRowSearch/GameRowSearch";
import GameRowSearchContainer from "Components/GameRowSearch";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("GameRowSearch", module);
const gonzosQuest = "gonzos-quest";

if (isNotChromatic) {
  stories.add(
    "Default (Connected)",
    () => (
      <MockStore>
        <GameRowSearchContainer slug="hall-of-gods" />
      </MockStore>
    ),
    info({ text: "Default" })
  );
}

stories.add(
  "Default (with search match)",
  () => (
    <GameRowSearch
      game={game}
      onLaunchGame={action(gonzosQuest)}
      query="gon"
      highlightSearchQuery={true}
    />
  ),
  info({ text: "Default" })
);

stories.add(
  "Default (without search match)",
  () => <GameRowSearch game={game} onLaunchGame={action(gonzosQuest)} />,
  info({ text: "Default" })
);

stories.add(
  "Jackpot Game (without search match)",
  () => (
    <GameRowSearch
      game={{ ...game, lobby: "test" }}
      onLaunchGame={action("gonzos-quest")}
      id="gonzos-quest"
    />
  ),
  info({ text: "Jackpot Game" })
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
