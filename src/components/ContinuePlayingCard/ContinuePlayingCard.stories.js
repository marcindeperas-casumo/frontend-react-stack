import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ContinuePlayingCard from "Components/ContinuePlayingCard/ContinuePlayingCard";
import MockStore from "Components/MockStore";
import game from "Components/GameTile/__mocks__/Game.json";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("ContinuePlayingCard", module);

if (isNotChromatic) {
  stories.add(
    "Default (Connected)",
    () => {
      return (
        <MockStore>
          <ContinuePlayingCard id={game.slug} />
        </MockStore>
      );
    },
    info({ text: "Default Tile" })
  );
}

stories.add(
  "Default",
  () => {
    return (
      <MockStore>
        <ContinuePlayingCard id={game.slug} />
      </MockStore>
    );
  },
  info({ text: "Default" })
);
