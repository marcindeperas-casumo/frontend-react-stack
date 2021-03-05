import { storiesOf } from "@storybook/react";
import React from "react";
import { BalanceBetSlip } from "./BalanceBetSlip";

const stories = storiesOf("Sports/BalanceBetSlip", module);

stories.add("Default", () => (
  <BalanceBetSlip
    t={{
      bonus_title: "Bonus",
      balance_title: "Balance",
    }}
    maximized={true}
    balance="€30.19"
  />
));

stories.add("Bonus", () => (
  <BalanceBetSlip
    t={{
      bonus_title: "Bonus",
      balance_title: "Balance",
    }}
    maximized={true}
    balance="€30.19"
    bonus="€10"
  />
));
