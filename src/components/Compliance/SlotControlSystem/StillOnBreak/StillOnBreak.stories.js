// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select, number, boolean } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import { StillOnBreak } from "./StillOnBreak";

const t = {
  still_on_break: "You're still on break",
  still_on_break_subtext: "You may continue playing at {{time}}",
  still_on_break_button_label: "Got it",
};
const stories = storiesOf("Compliance/SlotControlSystem/StillOnBreak", module);
stories.add("Default", () => {
  return (
    <StillOnBreak
      t={t}
      onClick={action("clicked")}
      exclusionExpiryTime={Date.now()}
    />
  );
});
