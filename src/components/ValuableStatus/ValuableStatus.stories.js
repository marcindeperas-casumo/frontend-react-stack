// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select, text } from "@storybook/addon-knobs/react";
import Text from "@casumo/cmp-text";
import { VALUABLE_STATES } from "Models/valuables";
import { ValuableStatus } from "./ValuableStatus";

const stories = storiesOf("ValuableStatus", module);

stories.add("Default", () => {
  const valuableState = select(
    "Valuable State",
    VALUABLE_STATES,
    VALUABLE_STATES.LOCKED
  );
  const expiryHours = text("Expire in x hours", "100") || "100";
  const label = text("Status label", "Locked") || null;

  return (
    <ValuableStatus
      state={valuableState}
      hoursToExpiry={expiryHours}
      label={
        <Text size="2xs" tag="span" className="u-font-weight-bold">
          {label}
        </Text>
      }
    />
  );
});
