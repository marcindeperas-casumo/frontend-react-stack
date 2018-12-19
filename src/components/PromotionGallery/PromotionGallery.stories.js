import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import promotions from "Components/PromotionGalleryCard/__mocks__/promotions.json";
import PromotionGallery from ".";

const stories = storiesOf("PromotionGallery", module);

const state = {
  schema: {
    cms: { ...promotions },
  },
};

stories.add(
  "Default",
  () => (
    <MockStore state={state}>
      <PromotionGallery
        slug="campaigns.winter_games"
        title="Campaignaramaroony"
        titleColor="white"
        backgroundColor="blue"
      />
    </MockStore>
  ),
  info({ text: "Default" })
);
