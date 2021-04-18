import { storiesOf } from "@storybook/react";
import { boolean } from "@storybook/addon-knobs";
import React from "react";
// import { viewports } from "Storybook/viewports";

const viewports = { mobile: null, desktop: null, tablet: null, phablet: null };
import { GameDetails } from "./GameDetails";
import {
  gameDetails,
  gameDetailsInMaintenance,
  t,
} from "./__mocks__/gameDetailsMock";

const stories = storiesOf("GameDetails", module);

stories.add("Default", () => {
  const game = {
    ...gameDetails,
    isInMaintenance: boolean("Is in maintenance", false),
  };

  return <GameDetails game={game} t={t} />;
});

stories.add("In Maintenance", () => (
  <GameDetails game={gameDetailsInMaintenance} t={t} />
));

stories.add(
  "Default (mobile)",
  () => <GameDetails game={gameDetails} t={t} />,
  viewports.mobile
);
stories.add(
  "Default (tablet)",
  () => <GameDetails game={gameDetails} t={t} />,
  viewports.tablet
);
stories.add(
  "Default (desktop)",
  () => <GameDetails game={gameDetails} t={t} />,
  viewports.desktop
);
