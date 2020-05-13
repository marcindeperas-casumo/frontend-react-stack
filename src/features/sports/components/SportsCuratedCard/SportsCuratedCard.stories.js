/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/react-testing";
import { SportsCuratedCard } from "./SportsCuratedCard";
import { curatedCardQueryMock } from "./__mocks__/curatedCardQuery.mock";

const stories = storiesOf("Sports/WelcomeOfferCuratedCard", module);

stories.add("Default", () => (
  <MockedProvider mocks={[curatedCardQueryMock]} addTypename={false}>
    <SportsCuratedCard vertical="SPORTS" hasDeposited={false} />
  </MockedProvider>
));
