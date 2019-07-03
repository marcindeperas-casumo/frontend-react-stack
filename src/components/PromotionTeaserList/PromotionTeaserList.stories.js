// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { PromotionTeaserList } from "Components/PromotionTeaserList";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const state = {
  schema: {
    cms: promotions,
  },
};

const stories = storiesOf("PromotionTeaserList", module);

stories.add("Default", () => (
  <MockStore state={state}>
    <PromotionTeaserList slug="campaigns.winter_games" />
  </MockStore>
));
