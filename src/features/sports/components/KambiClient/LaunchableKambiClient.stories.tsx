import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import MockStore from "Components/MockStore";
import stateMock from "Models/__mocks__/state.mock";
import { errorMocks, loadingMocks } from "./__mocks__/kambiClientMocks";
import { LaunchableKambiClient } from "./LaunchableKambiClient";

const stories = storiesOf("Sports/LaunchableKambiClient", module);

const props = {
  currency: "EUR",
  market: "MT",
  locale: "en MT",
};

stories.add("Loading", () => (
  <MockStore state={stateMock}>
    <MockedProvider mocks={loadingMocks} addTypename={false}>
      {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ currency: string; market: string; locale: ... Remove this comment to see the full error message */}
      <LaunchableKambiClient {...props} />
    </MockedProvider>
  </MockStore>
));

stories.add("Error", () => (
  <MockStore state={stateMock}>
    <MockedProvider mocks={errorMocks} addTypename={false}>
      {/* @ts-expect-error ts-migrate(2559) FIXME: Type '{ currency: string; market: string; locale: ... Remove this comment to see the full error message */}
      <LaunchableKambiClient {...props} />
    </MockedProvider>
  </MockStore>
));
