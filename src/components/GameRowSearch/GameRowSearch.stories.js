// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import game from "Components/GameTile/__mocks__/Game.json";
import MockStore from "Components/MockStore";
import { GameRowSearch } from "Components/GameRowSearch/GameRowSearch";
import { GameRowSearchContainer } from "Components/GameRowSearch/GameRowSearchContainer";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("GameRowSearch", module);
const gonzosQuest = "gonzos-quest";

if (isNotChromatic) {
  stories.add("Default (Connected)", () => (
    <MockStore>
      <GameRowSearchContainer slug="hall-of-gods" />
    </MockStore>
  ));
}

stories.add("Default (with search match)", () => (
  <GameRowSearch
    game={game}
    onLaunchGame={action(gonzosQuest)}
    query="gon"
    rowCount={124}
    highlightSearchQuery
  />
));

stories.add("Default (without search match)", () => (
  <GameRowSearch game={game} onLaunchGame={action(gonzosQuest)} />
));

stories.add("Jackpot Game (without search match)", () => (
  <GameRowSearch
    game={{ ...game, lobby: "test" }}
    onLaunchGame={action(gonzosQuest)}
    slug="gonzos-quest"
    rowCount={124}
  />
));
