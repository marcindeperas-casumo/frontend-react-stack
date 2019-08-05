// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import { PromotionCardListTitleRow } from "Components/PromotionCardList/PromotionCardListTitleRow";

const stories = storiesOf("PromotionCardListTitleRow", module);

const PromotionCardListTitleRowStories = () => (
  <div>
    <PromotionCardListTitleRow
      title="whatever"
      seeMoreUrl="foo"
      seeMoreText="bar"
    />
  </div>
);

stories.add("PromotionCardListTitleRow", PromotionCardListTitleRowStories);
