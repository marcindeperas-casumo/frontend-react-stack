// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import MustDropJackpotsWidgetConnected from "Components/MustDropJackpotsWidget";
import MustDropJackpotsWidget from "Components/MustDropJackpotsWidget/MustDropJackpotsWidget";
import data from "Components/MustDropJackpotsWidget/__mocks__/jackpots.json";
import isNotChromatic from "Storybook/isNotChromatic";

const stories = storiesOf("MustDropJackpotsWidget", module);

const noop = () => undefined;

if (isNotChromatic) {
  stories.add("Default (Connected)", () => (
    <MockStore>
      <MustDropJackpotsWidgetConnected />
    </MockStore>
  ));
}

stories.add("Default", () => (
  <MustDropJackpotsWidget
    isFetched={true}
    jackpots={data}
    fetchJackpots={noop}
    fetchCmsContent={noop}
    subscribeToUpdates={noop}
    unsubscribeFromUpdates={noop}
  />
));
