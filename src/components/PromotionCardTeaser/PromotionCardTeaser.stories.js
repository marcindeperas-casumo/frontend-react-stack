// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import PromotionCardTeaser from "Components/PromotionCardTeaser";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";

const state = {
  schema: {
    cms: promotions,
  },
};

const stories = storiesOf("PromotionCardTeaser", module);

stories.add(
  "Default",
  () => (
    <MockStore state={state}>
      <div style={{ maxWidth: 350 }}>
        <PromotionCardTeaser slug="promotions.boosted-reelraces" />
      </div>
    </MockStore>
  ),
  {
    backgrounds: [{ name: "colorful", value: "#0085c1", default: true }],
    ...info({ text: "Default" }),
  }
);
