// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import { PromotionCard } from "./PromotionCard";

const stories = storiesOf("PromotionCard", module);

const promotion = {
  id: "boosted-reel-races",
  slug: "boosted-reel-races",
  title: "Boosted Reel Races",
  subtitle: "",
  image:
    "https://cms.casumo.com/wp-content/uploads/2018/11/boosted-reel-races.png",
  badge:
    'https://cms.casumo.com/wp-content/uploads/2018/10/promobadge-boostedreelraces.png"',
};

stories.add("Default (Presentational)", () => (
  <div className="c-promotion-card">
    <PromotionCard promotion={promotion} />
  </div>
));
