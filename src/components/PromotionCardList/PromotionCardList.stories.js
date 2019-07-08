// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
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
    <div style={{ width: "1200px" }}>
      <PromotionCardList
        slug="campaigns.winter_games"
        title="This Sexy AF campaign"
        titleColor="white"
        backgroundColor="blue"
      />
    </div>
  </MockStore>
);

stories.add("PromotionCardList", PromotionCardsStories);
