// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { DepositLimitsTopNavigation } from "./DepositLimitsTopNavigation";

const t = {
  yourStuffLabel: "Your Stuff",
  detailsLabel: "Details & Settings",
  playOkayLabel: "Play Okay Settings",
};

storiesOf("DepositLimits/DepositLimitsTopNavigation", module).add(
  "Default",
  () => <DepositLimitsTopNavigation t={t} action={action("Navigated away")} />
);
