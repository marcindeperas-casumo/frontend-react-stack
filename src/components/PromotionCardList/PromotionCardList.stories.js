// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import info from "Storybook/storybookInfo";
import PromotionCardList from "Components/PromotionCardList";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const stories = storiesOf("PromotionCardList", module);

const state = {
  schema: {
    cms: { ...promotions },
  },
};

const PromotionCardsStories = () => (
  <MockStore state={state}>
    <PromotionCardList
      slug="campaigns.winter_games"
      title="This Sexy AF campaign"
      titleColor="white"
      backgroundColor="blue"
    />
  </MockStore>
);

stories.add(
  "PromotionCardList",
  PromotionCardsStories,
  info({ text: "Displays the promotion cards" })
);
