// @flow
import * as React from "react";
import { storiesOf } from "@storybook/react";
import { select, number, boolean } from "@storybook/addon-knobs/react";
import { action } from "@storybook/addon-actions";
import { NotEnoughFunds } from "./NotEnoughFunds";

const t = {
  not_enough_funds: "You don't have enough funds to play with",
  not_enough_funds_button_label: "Deposit now",
};
const stories = storiesOf(
  "Compliance/SlotControlSystem/NotEnoughFunds",
  module
);
stories.add("Default", () => {
  return <NotEnoughFunds t={t} onClick={action("clicked")} />;
});
