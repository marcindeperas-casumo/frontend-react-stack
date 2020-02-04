// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean, withKnobs } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";
import GameTileExclusive from "./GameTileExclusive";
import exclusiveGame from "./__mocks__/ExclusiveGame.json";

const stories = storiesOf("GameTileExclusive", module);
stories.addDecorator(withKnobs);

stories.add("Default Tile", () => {
  const inMaintenanceMode = boolean(
    "In maintenance mode",
    exclusiveGame.inMaintenanceMode
  );
  return (
    <div className="c-exclusive-game">
      <MockStore>
        <GameTileExclusive
          game={{ ...exclusiveGame, inMaintenanceMode }}
          onLaunchGame={action(exclusiveGame.name)}
        />
      </MockStore>
    </div>
  );
});
