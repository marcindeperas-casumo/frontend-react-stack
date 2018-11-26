import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import MustDropJackpotsWidgetConnected from "Components/MustDropJackpotsWidget";
import MustDropJackpotsWidget from "Components/MustDropJackpotsWidget/MustDropJackpotsWidget";
import data from "Components/MustDropJackpotsWidget/__mocks__/jackpots.json";
const stories = storiesOf("MustDropJackpotsWidget", module);

const anon = () => ({});

stories.add(
  "Default (Connected)",
  () => (
    <MockStore>
      <MustDropJackpotsWidgetConnected />
    </MockStore>
  ),
  info({ text: "Default" })
);

stories.add(
  "Default",
  () => (
    <MustDropJackpotsWidget
      jackpots={data}
      isFetched={true}
      subscribeToUpdates={anon}
      unsubscribeFromUpdates={anon}
    />
  ),
  info({ text: "Default" })
);
