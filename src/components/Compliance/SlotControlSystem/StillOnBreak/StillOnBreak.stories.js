// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { StillOnBreak } from "./StillOnBreak";

const t = {
  still_on_break: "You're still on break",
  still_on_break_subtext: "You may continue playing in {{time}}",
  still_on_break_button_label: "Got it",
  hours: "{{hours}} hours",
  minutes: "{{minutes}} minutes",
  seconds: "{{seconds}} seconds",
};
const stories = storiesOf("Compliance/SlotControlSystem/StillOnBreak", module);
stories.add("Default", () => {
  return (
    <StillOnBreak
      t={t}
      onClick={action("clicked")}
      exclusionExpiryTime={1574423978913}
    />
  );
});
