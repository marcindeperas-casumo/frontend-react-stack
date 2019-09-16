/* @flow */
import React from "react";
import { storiesOf } from "@storybook/react";
import defaultStateMock from "Models/__mocks__/state.mock";
import MockStore from "Components/MockStore";
import { WelcomeOfferCuratedCard, CMS_SLUG } from "./WelcomeOfferCuratedCard";
import { mock } from "./__mock__";

const stories = storiesOf("Sports/WelcomeOfferCuratedCard", module);

const stateMock = {
  ...defaultStateMock,
  schema: {
    cms: {
      [`curated.${CMS_SLUG}`]: {
        fields: mock,
      },
    },
  },
};

stories.add("Default", () => (
  <MockStore state={stateMock}>
    <WelcomeOfferCuratedCard vertical="SPORTS" hasDeposited={false} />
  </MockStore>
));
