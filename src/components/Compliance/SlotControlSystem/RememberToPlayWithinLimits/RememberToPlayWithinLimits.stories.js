// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { RememberToPlayWithinLimits } from "./RememberToPlayWithinLimits";

const t = {
  remember_to_play_within_limits: "Remember to play within limits",
  remember_to_play_within_limits_subtext:
    "Are you sure you'd like to play some more today?",
  remember_to_play_within_limits_yes_label: "Yes, continue playing",
  remember_to_play_within_limits_about_label: "About responsible gaming",
};
const stories = storiesOf(
  "Compliance/SlotControlSystem/RememberToPlayWithinLimits",
  module
);
stories.add("Default", () => {
  return (
    <RememberToPlayWithinLimits
      onClickAbout={action("onClickAbout")}
      onClickYes={action("onClickYes")}
      t={t}
    />
  );
});
