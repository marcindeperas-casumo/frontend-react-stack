/* @flow */
import React from "react";
import { action } from "@storybook/addon-actions";
import { storiesOf } from "@storybook/react";
import { BlueRibbon } from "./BlueRibbon";
import { Counter } from "./Counter";
import { Coins } from "./Coins";

const stories = storiesOf("BlueRibbonWinAnimation", module);

stories.add("Default", () => (
  <div
  >
    <BlueRibbon onClose={action("onClose")}>
      <Coins></Coins>
      <Counter></Counter>
    </BlueRibbon>
  </div>
));
