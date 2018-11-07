import { action } from "@storybook/addon-actions";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { storiesOf } from "@storybook/react";
import React from "react";
import MockStore from "Components/MockStore";
import info from "Storybook/storybookInfo";
import GameTile from "Components/GameTile";
import GameTileExclusive from "Components/GameTileExclusive";
import game from "./__mocks__/Game.json";
import jackpotInfo from "./__mocks__/JackpotGameInfo.json";
import exclusiveGame from "./__mocks__/ExclusiveGame.json";

const stories = storiesOf("GameTile", module);
stories.addDecorator(withKnobs);

stories.add(
  "Default Tile",
  () => {
    const inMaintenanceMode = boolean(
      "In maintenance mode",
      game.inMaintenanceMode
    );
    return (
      <MockStore>
        <GameTile {...game} inMaintenanceMode={inMaintenanceMode} />
      </MockStore>
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
      <MockStore>
        <GameTile
          {...{ ...game, jackpotInfo }}
          inMaintenanceMode={inMaintenanceMode}
        />
      </MockStore>
    );
  },
  info({ text: "With Jackpot" })
);

stories.add(
  "Tall Tile",
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
