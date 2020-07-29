// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs/react";
import { viewports } from "Storybook/viewports";
import { GameDetails } from "./GameDetails";
import {
  gameDetails,
  gameDetailsInMaintenance,
  t,
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

  return <GameDetails data={data} t={t} />;
});

stories.add("In Maintenance", () => (
  <GameDetails data={gameDetailsInMaintenance} t={t} />
));

stories.add(
  "Default (mobile)",
  () => <GameDetails data={gameDetails} t={t} />,
  viewports.mobile
);
stories.add(
  "Default (tablet)",
  () => <GameDetails data={gameDetails} t={t} />,
  viewports.tablet
);
stories.add(
  "Default (desktop)",
  () => <GameDetails data={gameDetails} t={t} />,
  viewports.desktop
);
