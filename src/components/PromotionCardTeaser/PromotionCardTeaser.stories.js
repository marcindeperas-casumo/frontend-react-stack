// @flow
import React from "react";
import { storiesOf } from "@storybook/react";

import info from "Storybook/storybookInfo";

import PromotionCardTeaser from "./";

const stories = storiesOf("PromotionCardTeaser", module);

stories.add(
  "Default",
  () => (
    <div style={{ maxWidth: 350 }}>
      <PromotionCardTeaser
        date="30 Nov 2018 - 6 Jan 2019"
        imageSrc="https://cms.casumo.com/wp-content/uploads/2018/11/promotions-bonus-cards.svg"
        title="Boosted<br /> Reel<br /> Races"
      />
    </div>
  ),
  {
    backgrounds: [{ name: "colorful", value: "#0085c1", default: true }],
    ...info({ text: "Default" }),
  }
);
