/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { WelcomeOfferCuratedCard } from "./WelcomeOfferCuratedCard";
import { curatedCardQueryMock } from "./__mocks__/curatedCardQuery.mock";

const stories = storiesOf("Sports/WelcomeOfferCuratedCard", module);

stories.add("Default", () => (
  <MockedProvider mocks={[curatedCardQueryMock]} addTypename={false}>
    <WelcomeOfferCuratedCard
      vertical="SPORTS"
      hasDeposited={false}
      currentHash="#home"
    />
  </MockedProvider>
));
