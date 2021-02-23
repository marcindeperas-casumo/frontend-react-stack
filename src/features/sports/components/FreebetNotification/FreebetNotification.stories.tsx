// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { boolean } from "@storybook/addon-knobs";
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
    <FreebetNotification
      {...freebetProps}
      valuableState={valuableState}
      onClose={action("close")}
    />
  );
});
