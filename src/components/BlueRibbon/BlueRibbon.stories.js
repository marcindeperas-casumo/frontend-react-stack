/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { BlueRibbonAnimation } from "./BlueRibbon";
import { CoinContainer } from "./Coins";
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

const coin = {
  id: "Frame1",
  order: 1,
  left: 0,
  top: 0,
  group: "big",
  width: 92,
  height: 88,
};

const CoinWrapper = () => {
  return (
    <div className="u-width--full u-height--full">
      <div className="c-coins-container">
        <CoinContainer
          definition={coin}
          isVisible={true}
          isHighlighted={true}
        />
      </div>
    </div>
  );
};

stories.add("Single coin", () => <CoinWrapper />);

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
