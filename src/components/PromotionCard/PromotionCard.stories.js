import { storiesOf } from "@storybook/react";
import React from "react";
import info from "../../../.storybook/storybookInfo";
import PromotionCard from "Components/PromotionCard";
import { action } from "@storybook/addon-actions";
import MockStore from "Components/MockStore";

const stories = storiesOf("PromotionCard", module);

const PromotionCardStories = () => (
  <MockStore>
    <PromotionCard promotionSlug="boosted-reelraces" parentSlug="promotions" />
  </MockStore>
);

stories.add(
  "PromotionCard",
  PromotionCardStories,
  info({ text: "Displays the promotion card" })
);
