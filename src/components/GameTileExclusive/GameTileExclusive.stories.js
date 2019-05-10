// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import GameTileExclusiveConnected from "Components/GameTileExclusive";
import GameTileExclusive from "Components/GameTileExclusive/GameTileExclusive";
import isNotChromatic from "Storybook/isNotChromatic";
import exclusiveGame from "./__mocks__/ExclusiveGame.json";

const stories = storiesOf("GameTileExclusive", module);
stories.addDecorator(withKnobs);

if (isNotChromatic) {
  stories.add("Default Tile (Connected)", () => {
    return (
      <MockStore>
        <GameTileExclusiveConnected id="jammin-jars" />
      </MockStore>
    );
  });
}

stories.add("Default Tile", () => {
  const inMaintenanceMode = boolean(
    "In maintenance mode",
    exclusiveGame.inMaintenanceMode
  );
  return (
    <GameTileExclusive
      game={{ ...exclusiveGame, inMaintenanceMode }}
      onLaunchGame={action(exclusiveGame.name)}
    />
  );
});
