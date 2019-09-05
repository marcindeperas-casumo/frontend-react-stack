// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProviderWithContext } from "Features/sports/components/GraphQL";
import { errorMocks, loadingMocks } from "./__mocks__/kambiClientMocks";
import { LaunchableKambiClient } from "./LaunchableKambiClient";

const stories = storiesOf("Sports/LaunchableKambiClient", module);

const props = {
  currency: "EUR",
  market: "MT",
  locale: "en MT",
};

stories.add("Loading", () => (
  <MockedProviderWithContext mocks={loadingMocks} addTypename={false}>
    <LaunchableKambiClient {...props} />
  </MockedProviderWithContext>
));

stories.add("Error", () => (
  <MockedProviderWithContext mocks={errorMocks} addTypename={false}>
    <LaunchableKambiClient {...props} />
  </MockedProviderWithContext>
));
