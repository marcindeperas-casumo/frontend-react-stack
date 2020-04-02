// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs/react";
import { GameDetails } from "./GameDetails";
import { gameDetails } from "./__mocks__/gameDetailsMock";

const stories = storiesOf("GameDetails", module);

stories.add("Default", () => {
  const data = {
    ...gameDetails,
    game: {
      ...gameDetails.game,
      isInMaintenance: boolean("Is in maintenance", false),
    },
  };

  return <GameDetails data={data} />;
});
