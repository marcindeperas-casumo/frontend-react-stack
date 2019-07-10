// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { PromotionTeaserList as PromotionTeaserListPresentational } from "Components/PromotionTeaserList/PromotionTeaserList";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const state = {
  schema: {
    cms: promotions,
  },
};

const stories = storiesOf("PromotionTeaserList", module);

stories.add("PromotionTeaserList (Presentational)", () => (
  <MockStore state={state}>
    <div style={{ maxWidth: 350 }}>
      <PromotionTeaserListPresentational
        slug="promotions.boosted-reelraces"
        isFetched={true}
        fetchCampaign={() => {}}
        fetchPromotions={() => {}}
        promotionsSlugs={[
          "boosted-reelraces",
          "must-drop-jackpots",
          "big-giveaway",
          "mystery-prizes",
          "christmas-countdown",
        ]}
      />
    </div>
  </MockStore>
));
