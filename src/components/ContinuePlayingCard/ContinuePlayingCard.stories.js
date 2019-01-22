import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import ContinuePlayingCard from "Components/ContinuePlayingCard";
import MockStore from "Components/MockStore";
import game from "Components/GameTile/__mocks__/Game.json";

const stories = storiesOf("ContinuePlayingCard", module);

stories.add(
  "Default",
  () => {
    return (
      <MockStore>
        <ContinuePlayingCard id={game.slug} />
      </MockStore>
    );
  },
  info({ text: "Default Continue Playing tile" })
);
