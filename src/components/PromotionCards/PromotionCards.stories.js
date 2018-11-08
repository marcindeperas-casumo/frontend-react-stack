import { storiesOf } from "@storybook/react";
import React from "react";
import info from "../../../.storybook/storybookInfo";
import PromotionCards from "Components/PromotionCards";
import MockStore from "Components/MockStore";

const stories = storiesOf("PromotionCards", module);

const PromotionCardsStories = () => (
  <MockStore>
    <PromotionCards
      promotionsSlugs={["one", "two", "three", "four"]}
      isFetched={true}
      title="This sexy campaign 👀🌶"
      titleColor="t-color-white"
      backgroundColor="t-background-blue"
    />
  </MockStore>
);

stories.add(
  "PromotionCards",
  PromotionCardsStories,
  info({ text: "Displays the promotion cards" })
);
