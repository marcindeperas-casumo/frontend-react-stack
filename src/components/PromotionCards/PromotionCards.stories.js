import { storiesOf } from "@storybook/react";
import React from "react";
import info from "../../../.storybook/storybookInfo";
import PromotionCards from "Components/PromotionCards";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const stories = storiesOf("PromotionCards", module);

const state = {
  schema: {
    cms: promotions,
  },
};

const PromotionCardsStories = () => (
  <MockStore state={state}>
    <PromotionCards
      slug="promotions"
      title="This Sexy AF campaign"
      titleColor="t-color-white"
      backgroundColor="t-background-blue"
    />
  </MockStore>
);

stories.add(
  "PromotionCards",
  PromotionCardsStories,
  info({ text: "Displays the promotion cards" })
);
