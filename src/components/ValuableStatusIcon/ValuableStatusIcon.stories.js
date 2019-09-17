// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select, text } from "@storybook/addon-knobs/react";
import { VALUABLE_STATES } from "Models/valuables";
import { ValuableStatusIcon } from "./ValuableStatusIcon";

const stories = storiesOf("ValuableStatusIcon", module);

stories.add("Default", () => {
  const valuableState = select(
    "Valuable State",
    VALUABLE_STATES,
    VALUABLE_STATES.LOCKED
  );
  const expiryHours = text("Expire in x hours", "100") || "100";

  return (
    <ValuableStatusIcon state={valuableState} hoursToExpiry={expiryHours} />
  );
});
