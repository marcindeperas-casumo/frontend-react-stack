// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import { ReelRaceStartingNotification } from "./ReelRaceStartingNotification";

const stories = storiesOf(
  "GamePage/GamePageNotifications/ReelRaceStartingNotification",
  module
);

stories.add("Default", () => {
  return (
    <ReelRaceStartingNotification
      secondsToStart={number("Seconds to Start", 10)}
    />
  );
});
