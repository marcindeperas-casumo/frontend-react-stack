/* @flow */
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { BlueRibbon } from "./BlueRibbon";
import { Counter } from "./Counter";
import { Coins } from "./Coins";
import {Jackpots} from './Jackpots.js'


const stories = storiesOf("BlueRibbonWinAnimation", module);

stories.add("Coins and Jackpot", () => (
  <div
  >
    <BlueRibbon onClose={action("onClose")}>
      <Coins></Coins>
    </BlueRibbon>
  </div>
));

stories.add("Jackpots", () => (
  <div>
    <Jackpots jackpotType='MINI'></Jackpots>
  </div>
));

stories.add("Jackpot counter", () => (
  <div>
    <Counter></Counter>
  </div>
));
