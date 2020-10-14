// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { BlueRibbonJackpotsWidget } from "./BlueRibbonJackpotsWidget";
import { t } from "./__mocks__/t";
import { jackpots } from "./__mocks__/jackpots";

const stories = storiesOf("BlueRibbon", module);
stories.add("JackpotsWidget", () => (
  <MockStore>
    <BlueRibbonJackpotsWidget jackpots={jackpots} t={t} />
  </MockStore>
));
