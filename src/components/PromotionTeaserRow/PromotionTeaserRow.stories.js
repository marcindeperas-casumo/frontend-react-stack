// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { PromotionTeaserRow } from "Components/PromotionTeaserRow";
import { PromotionTeaserRow as PromotionTeaserRowPresentational } from "Components/PromotionTeaserRow/PromotionTeaserRow";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";

const state = {
  schema: {
    cms: promotions,
  },
};

const stories = storiesOf("PromotionTeaserRow", module);

if (isNotChromatic) {
  stories.add(
    "PromotionTeaserRow (Connected)",
    () => (
      <MockStore state={state}>
        <div style={{ maxWidth: 350 }}>
          <PromotionTeaserRow slug="promotions.boosted-reelraces" />
        </div>
      </MockStore>
    ),
    {
      backgrounds: [{ name: "colorful", value: "#0085c1", default: true }],
    }
  );
}

stories.add(
  "PromotionTeaserRow (Presentational)",
  () => (
    <MockStore state={state}>
      <div style={{ maxWidth: 350 }}>
        <PromotionTeaserRowPresentational
          slug="promotions.boosted-reelraces"
          link="promotions/boosted-reelraces"
          dates={state.schema.cms["promotions.boosted-reelraces"].fields.dates}
          title={state.schema.cms["promotions.boosted-reelraces"].fields.title}
        />
      </div>
    </MockStore>
  ),
  {
    backgrounds: [{ name: "colorful", value: "#0085c1", default: true }],
  }
);
