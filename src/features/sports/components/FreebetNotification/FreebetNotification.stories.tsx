import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
import React from "react";
import { VALUABLE_STATES } from "Models/valuables";
import { freebetProps } from "./__mocks__/freebetProps";
import { FreebetNotification } from "./FreebetNotification";

const stories = storiesOf("FreebetNotification", module);

stories.add("Default", () => {
  const isLocked = boolean("Locked", true);
  const valuableState = isLocked
    ? VALUABLE_STATES.LOCKED
    : VALUABLE_STATES.FRESH;
  return (
    // @ts-expect-error ts-migrate(2741) FIXME: Property 'translations' is missing in type '{ valu... Remove this comment to see the full error message
    <FreebetNotification
      {...freebetProps}
      valuableState={valuableState}
      onClose={action("close")}
    />
  );
});
