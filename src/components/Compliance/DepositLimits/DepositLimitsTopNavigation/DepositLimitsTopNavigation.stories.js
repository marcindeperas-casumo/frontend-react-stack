// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { decorate } from "@storybook/addon-actions";
import { DepositLimitsTopNavigation } from "./DepositLimitsTopNavigation";

const stories = storiesOf(
  "Compliance/DepositLimits/DepositLimitsTopNavigation",
  module
);
const t = {
  yourStuffLabel: "Your Stuff",
  detailsLabel: "Details & Settings",
  playOkayLabel: "Play Okay Settings",
};
const firstArg = decorate([args => args.slice(0, 1)]);

stories.add("Default", () => (
  <DepositLimitsTopNavigation
    t={t}
    action={firstArg.action("Navigated away")}
  />
));
