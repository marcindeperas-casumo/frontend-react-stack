// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { TopNavigation } from "./TopNavigation";

const t = {
  yourStuffLabel: "Your Stuff",
  detailsLabel: "Details & Settings",
  playOkayLabel: "Play Okay Settings",
};

storiesOf("TopNavigation", module).add("Default", () => (
  <TopNavigation t={t} action={action("Navigated away")} />
));
