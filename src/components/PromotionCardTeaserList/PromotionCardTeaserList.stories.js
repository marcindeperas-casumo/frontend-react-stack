// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import PromotionCardTeaserList from "Components/PromotionCardTeaserList";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const state = {
  schema: {
    cms: promotions,
  },
};

const stories = storiesOf("PromotionCardTeaserList", module);

stories.add("Default", () => (
  <MockStore state={state}>
    <PromotionCardTeaserList
      slug="campaigns.winter_games"
      backgroundColor="blue-50"
    />
  </MockStore>
));
