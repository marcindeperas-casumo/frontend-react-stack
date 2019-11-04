// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { errorMocks, loadingMocks } from "./__mocks__/kambiClientMocks";
import { LaunchableKambiClient } from "./LaunchableKambiClient";

const stories = storiesOf("Sports/LaunchableKambiClient", module);

const props = {
  currency: "EUR",
  market: "MT",
  locale: "en MT",
};

stories.add("Loading", () => (
  <MockedProvider mocks={loadingMocks} addTypename={false}>
    <LaunchableKambiClient {...props} />
  </MockedProvider>
));

stories.add("Error", () => (
  <MockedProvider mocks={errorMocks} addTypename={false}>
    <LaunchableKambiClient {...props} />
  </MockedProvider>
));
