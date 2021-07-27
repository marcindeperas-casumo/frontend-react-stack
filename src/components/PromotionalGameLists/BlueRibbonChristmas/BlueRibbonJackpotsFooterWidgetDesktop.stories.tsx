import { storiesOf } from "@storybook/react";
import React from "react";
import MockStore from "Components/MockStore";
import { BlueRibbonJackpotsFooterWidgetDesktop } from "./BlueRibbonJackpotsFooterWidgetDesktop";
import { normalizedPots } from "./__mocks__/jackpots";

const stories = storiesOf("BlueRibbon", module);

stories.add("JackpotsFooterWidgetDesktop", () => (
  <MockStore>
    <BlueRibbonJackpotsFooterWidgetDesktop normalizedPots={normalizedPots} />
  </MockStore>
));
