import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import MockStore from "Components/MockStore";
import { SportsCuratedCard } from "./SportsCuratedCard";
import { curatedCardQueryMock } from "./__mocks__/curatedCardQuery.mock";

const stories = storiesOf("Sports/SportsCuratedCard", module);

stories.add("Default", () => (
  <MockedProvider mocks={[curatedCardQueryMock]} addTypename={false}>
    <MockStore>
      <SportsCuratedCard hasDeposited={true} currentHash="#home" />
    </MockStore>
  </MockedProvider>
));
