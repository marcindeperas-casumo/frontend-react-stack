// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import game from "Components/GameTile/__mocks__/Game.json";
import MockStore from "Components/MockStore";
import { GameRowSearch } from "Components/GameRowSearch/GameRowSearch";
import { GameRowSearchContainer } from "Components/GameRowSearch/GameRowSearchContainer";
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
      rowCount={124}
      highlightSearchQuery
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
      onLaunchGame={action(gonzosQuest)}
      slug="gonzos-quest"
      rowCount={124}
    />
  ),
  info({ text: "Jackpot Game" })
);
