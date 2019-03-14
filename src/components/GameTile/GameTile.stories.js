// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import GameTileConnected from "Components/GameTile";
import GameTile from "Components/GameTile/GameTile";
import isNotChromatic from "Storybook/isNotChromatic";
import game from "./__mocks__/Game.json";
import jackpotInfo from "./__mocks__/JackpotGameInfo.json";

const stories = storiesOf("GameTile", module);
stories.addDecorator(withKnobs);

if (isNotChromatic) {
  stories.add(
    "Default (Connected)",
    () => {
      return (
        <MockStore>
          <GameTileConnected id="starburst" />
        </MockStore>
      );
    },
    info({ text: "Default Tile" })
  );
}

stories.add(
  "Default",
  () => {
    const inMaintenanceMode = boolean(
      "In maintenance mode",
      game.inMaintenanceMode
    );
    return (
      <div style={{ maxWidth: "170px" }}>
        <MockStore>
          <GameTile
            game={{ ...game, inMaintenanceMode }}
            onLaunchGame={action(game.name)}
          />
        </MockStore>
      </div>
    );
  },
  info({ text: "Default Tile" })
);

stories.add(
  "With Jackpot",
  () => {
    const inMaintenanceMode = boolean(
      "In maintenance mode",
      game.inMaintenanceMode
    );
    return (
      <div style={{ maxWidth: "170px" }}>
        <MockStore>
          <GameTile
            game={{ ...game, jackpotInfo, inMaintenanceMode }}
            onLaunchGame={action(game.name)}
          />
        </MockStore>
      </div>
    );
  },
  info({ text: "With Jackpot" })
);
