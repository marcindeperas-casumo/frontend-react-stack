// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs/react";
import { viewports } from "Storybook/viewports";
import { GameDetails } from "./GameDetails";
import {
  gameDetails,
  gameDetailsInMaintenance,
} from "./__mocks__/gameDetailsMock";

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

stories.add("In Maintenance", () => (
  <GameDetails data={gameDetailsInMaintenance} />
));

stories.add(
  "Default (mobile)",
  () => <GameDetails data={gameDetails} />,
  viewports.mobile
);
stories.add(
  "Default (tablet)",
  () => <GameDetails data={gameDetails} />,
  viewports.tablet
);
