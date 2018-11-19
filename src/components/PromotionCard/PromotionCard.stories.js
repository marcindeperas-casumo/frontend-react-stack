import { storiesOf } from "@storybook/react";
import React from "react";
import info from "../../../.storybook/storybookInfo";
import PromotionCard from "Components/PromotionCard";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const stories = storiesOf("PromotionCard", module);

const state = {
  schema: {
    cms: promotions,
  },
};

const PromotionCardStories = () => (
  <MockStore state={state}>
    <PromotionCard slug="promotions.boosted-reelraces" />
  </MockStore>
);

stories.add(
  "PromotionCard",
  PromotionCardStories,
  info({ text: "Displays the promotion card" })
);
