// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { select, text } from "@storybook/addon-knobs/react";
import Text from "@casumo/cmp-text";
import { VALUABLE_STATES } from "Models/valuables";
import { ValuableStateIndicator } from "./ValuableStateIndicator";

const stories = storiesOf("ValuableStateIndicator", module);

stories.add("Default", () => {
  const valuableState = select(
    "Valuable State",
    VALUABLE_STATES,
    VALUABLE_STATES.LOCKED
  );
  const label = text("Status label", "Locked") || null;

  return (
    <ValuableStateIndicator
      state={valuableState}
      label={
        <Text size="2xs" tag="span" className="u-font-weight-bold">
          {label}
        </Text>
      }
    />
  );
});
