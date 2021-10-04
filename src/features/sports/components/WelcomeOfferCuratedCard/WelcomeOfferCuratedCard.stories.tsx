import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import MockStore from "Components/MockStore";
import { WelcomeOfferCuratedCard } from "./WelcomeOfferCuratedCard";
import { curatedCardQueryMock } from "./__mocks__/curatedCardQuery.mock";

const stories = storiesOf("Sports/WelcomeOfferCuratedCard", module);

stories.add("Default", () => (
  <MockedProvider mocks={[curatedCardQueryMock]} addTypename={false}>
    <MockStore>
      <WelcomeOfferCuratedCard
        vertical="SPORTS"
        hasDeposited={false}
        currentHash="#home"
      />
    </MockStore>
  </MockedProvider>
));
