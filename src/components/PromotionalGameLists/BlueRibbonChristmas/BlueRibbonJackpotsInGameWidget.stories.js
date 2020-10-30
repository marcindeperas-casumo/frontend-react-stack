// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { BlueRibbonJackpotsInGameWidget } from "./BlueRibbonJackpotsInGameWidget";
import { t } from "./__mocks__/t";
import { jackpots } from "./__mocks__/jackpots";

const stories = storiesOf("BlueRibbon", module);
stories.add("JackpotsInGameWidget", () => (
  <MockStore>
    <BlueRibbonJackpotsInGameWidget jackpots={jackpots} t={t} />
  </MockStore>
));
