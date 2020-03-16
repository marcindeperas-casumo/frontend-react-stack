// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import { PromotionCardList } from "./PromotionCardList";
import { promotionsListMock } from "./__mocks__/promotionsList.mock";

const stories = storiesOf("PromotionCardList", module);

const PromotionCardsStories = () => (
  <div style={{ width: "1200px" }}>
    <PromotionCardList
      id={promotionsListMock.id}
      name={promotionsListMock.name}
      promotions={promotionsListMock.promotions}
      seeMoreText="See more"
    />
  </div>
);

stories.add("PromotionCardList", PromotionCardsStories);
