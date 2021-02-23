// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import data from "Components/MustDropJackpotsWidget/__mocks__/jackpots.json";
import { MustDropJackpotsWidget } from "./MustDropJackpotsWidget";

const stories = storiesOf("MustDropJackpotsWidget", module);

const noop = () => undefined;

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
