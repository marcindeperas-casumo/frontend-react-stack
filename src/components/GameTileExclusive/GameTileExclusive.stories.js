import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import GameTileExclusiveConnected from "Components/GameTileExclusive";
import GameTileExclusive from "Components/GameTileExclusive/GameTileExclusive";
import exclusiveGame from "./__mocks__/ExclusiveGame.json";

const stories = storiesOf("GameTileExclusive", module);
stories.addDecorator(withKnobs);

stories.add(
  "Default Tile (Connected)",
  () => {
    return (
      <MockStore>
        <GameTileExclusiveConnected id="jammin-jars" />
      </MockStore>
    );
  },
  info({ text: "Default Tile" })
);

stories.add(
  "Default Tile",
  () => {
    const inMaintenanceMode = boolean(
      "In maintenance mode",
      exclusiveGame.inMaintenanceMode
    );
    return (
      <MockStore>
        <GameTileExclusive
          {...exclusiveGame}
          inMaintenanceMode={inMaintenanceMode}
        />
      </MockStore>
    );
  },
  info({ text: "Tall Tile" })
);
