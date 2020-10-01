// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { ReelRaceLeaderboardModal } from "./ReelRaceLeaderboardModal";

const stories = storiesOf("RSModal/Slots/ReelRaceLeaderboardModal", module);

stories.add("Someone won the race", () => {
  return (
    <ReelRaceLeaderboardModal
      acceptModal={action("acceptModal")}
      place={11}
      winnerName="jeff"
    />
  );
});

stories.add("Player won the race", () => {
  return (
    <ReelRaceLeaderboardModal acceptModal={action("acceptModal")} place={1} />
  );
});
