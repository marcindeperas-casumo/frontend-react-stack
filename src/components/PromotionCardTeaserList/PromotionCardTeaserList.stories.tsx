// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import PromotionCardTeaserList from "Components/PromotionCardTeaserList";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const state = {
  schema: {
    cms: promotions,
  },
};

const stories = storiesOf("PromotionCardTeaserList", module);

stories.add("Default", () => (
  <MockStore state={state}>
    <PromotionCardTeaserList
      slug="campaigns.winter_games"
      // @ts-expect-error ts-migrate(2322) FIXME: Type '{ slug: string; backgroundColor: string; }' ... Remove this comment to see the full error message
      backgroundColor="blue-50"
    />
  </MockStore>
));
