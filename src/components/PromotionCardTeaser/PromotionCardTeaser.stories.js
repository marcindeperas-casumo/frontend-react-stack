import React from "react";
import { storiesOf } from "@storybook/react";

import info from "Storybook/storybookInfo";

import PromotionCardTeaser from "./";

const stories = storiesOf("PromotionCardTeaser", module);

stories.add(
  "Default",
  () => (
    <div style={{ maxWidth: 350 }}>
      <PromotionCardTeaser />
    </div>
  ),
  info({ text: "Default" })
);
