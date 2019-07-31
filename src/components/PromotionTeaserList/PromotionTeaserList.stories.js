// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { PromotionTeaserList } from "Components/PromotionTeaserList";
import promotions from "Components/PromotionCard/__mocks__/promotions.json";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";

const state = {
  schema: {
    cms: promotions,
  },
};

const stories = storiesOf("PromotionTeaserList", module);

if (isNotChromatic) {
  stories.add("PromotionTeaserList (Connected)", () => (
    <div style={{ maxWidth: 350 }}>
      <MockStore state={state}>
        <PromotionTeaserList slug="promotions" />
      </MockStore>
    </div>
  ));
}
