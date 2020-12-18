/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { BlueRibbonAnimation } from "./BlueRibbon";
import { CounterScreen } from "./CounterScreen";

const stories = storiesOf("BlueRibbonWinAnimation", module).addParameters({
  noGlobalDecorator: true,
});

stories.add("Coins and Jackpots screen", () => {
  return (
    <div className="u-width--screen u-height--screen">
      <BlueRibbonAnimation />
    </div>
  );
});

const t = {
  jackpot_win_title: "You won {{type}} jackpot!",
  continue_button: "Continue",
};

stories.add("Counter screen", () => {
  return (
    <div className="u-width--screen u-height--screen">
      <CounterScreen
        t={t}
        amount={12314}
        type="mega"
        locale="en-GB"
        currency="GBP"
      />
    </div>
  );
});
