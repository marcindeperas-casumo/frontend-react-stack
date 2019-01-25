import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import GameTileWithoutOverlay from "Components/GameTileWithoutOverlay";
import MockStore from "Components/MockStore";
import game from "Components/GameTile/__mocks__/Game.json";

const stories = storiesOf("GameTileWithoutOverlay", module);

stories.add(
  "Default",
  () => {
    return (
      <MockStore>
        <GameTileWithoutOverlay id={game.slug} />
      </MockStore>
    );
  },
  info({ text: "Default gmae tile without overlay" })
);
