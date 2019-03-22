// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProviderWithContext } from "Features/sports/state/testUtils";
import info from "Storybook/storybookInfo";
import { errorMocks, loadingMocks } from "./__mocks__/kambiClientMocks";
import { LaunchableKambiClient } from "./LaunchableKambiClient";

const stories = storiesOf("Sports/LaunchableKambiClient", module);

const props = {
  currency: "EUR",
  market: "MT",
  locale: "en MT",
};

stories.add(
  "Loading",
  () => (
    <MockedProviderWithContext mocks={loadingMocks} addTypename={false}>
      <LaunchableKambiClient {...props} />
    </MockedProviderWithContext>
  ),
  info({ text: "Loading" })
);

stories.add(
  "Error",
  () => (
    <MockedProviderWithContext mocks={errorMocks} addTypename={false}>
      <LaunchableKambiClient {...props} />
    </MockedProviderWithContext>
  ),
  info({ text: "Error" })
);
