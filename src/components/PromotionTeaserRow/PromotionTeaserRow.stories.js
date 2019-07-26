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
  stories.add("PromotionTeaserRow (Connected)", () => (
    <div style={{ maxWidth: 350 }}>
      <MockStore state={state}>
        <PromotionTeaserRow slug="promotions.boosted-reelraces" />
      </MockStore>
    </div>
  ));
}

stories.add("PromotionTeaserRow (Presentational)", () => (
  <div style={{ maxWidth: 350 }}>
    <PromotionTeaserRowPresentational
      slug="promotions.boosted-reelraces"
      link="promotions/boosted-reelraces"
      dates={state.schema.cms["promotions.boosted-reelraces"].fields.dates}
      title={state.schema.cms["promotions.boosted-reelraces"].fields.title}
    />
  </div>
));
