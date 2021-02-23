// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { number } from "@storybook/addon-knobs";
import { action } from "@storybook/addon-actions";
import { ReelRaceStartingNotification } from "./ReelRaceStartingNotification";

const stories = storiesOf(
  "GamePage/GamePageNotifications/ReelRaceStartingNotification",
  module
);

stories.add("Default", () => {
  return (
    <ReelRaceStartingNotification
      secondsLeft={number("Seconds Left", 5)}
      secondsLeftWhenShown={10}
      onClickDismiss={action("dismiss clicked")}
    />
  );
});
