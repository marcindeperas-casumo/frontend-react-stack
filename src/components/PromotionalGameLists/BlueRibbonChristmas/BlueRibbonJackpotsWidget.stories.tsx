import { storiesOf } from "@storybook/react";
import React from "react";
import MockStore from "Components/MockStore";
import { BlueRibbonJackpotsWidget } from "./BlueRibbonJackpotsWidget";
import { composedPots } from "./__mocks__/jackpots";

const stories = storiesOf("BlueRibbon", module);
stories.add("JackpotsWidget", () => (
  <MockStore>
    <BlueRibbonJackpotsWidget
      composedPots={composedPots}
      widgetColor={{ dark: "#0A0449", light: "#330887" }}
    />
  </MockStore>
));
