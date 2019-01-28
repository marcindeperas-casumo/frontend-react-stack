import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import info from "Storybook/storybookInfo";
import GameTileWithoutOverlayConnected from "Components/GameTileWithoutOverlay";
import GameTileWithoutOverlay from "Components/GameTileWithoutOverlay/GameTileWithoutOverlay";
import MockStore from "Components/MockStore";
import game from "Components/GameTile/__mocks__/Game.json";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("GameTileWithoutOverlay", module);

if (isNotChromatic) {
  stories.add(
    "Default tile without overlay (Connected)",
    () => {
      return (
        <MockStore>
          <GameTileWithoutOverlayConnected id={game.slug} />
        </MockStore>
      );
    },
    info({ text: "Default Tile" })
  );
}

stories.add(
  "Default tile without overlay",
  () => {
    return (
      <MockStore>
        <GameTileWithoutOverlay game={game} onLaunchGame={action(game.name)} />
      </MockStore>
    );
  },
  info({ text: "Default game tile without overlay" })
);
