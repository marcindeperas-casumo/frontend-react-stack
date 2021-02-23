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
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'link' is missing in type '{ slug: string... Remove this comment to see the full error message */}
        <PromotionTeaserRow slug="promotions.boosted-reelraces" />
      </MockStore>
    </div>
  ));
}

stories.add("PromotionTeaserRow (Presentational)", () => (
  <div style={{ maxWidth: 350 }}>
    <PromotionTeaserRowPresentational
      // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
      slug="promotions.boosted-reelraces"
      link="promotions/boosted-reelraces"
      dates={state.schema.cms["promotions.boosted-reelraces"].fields.dates}
      title={state.schema.cms["promotions.boosted-reelraces"].fields.title}
    />
  </div>
));
