import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import PromotionPrizeTable from "./";

const stories = storiesOf("PromotionPrizeTable", module);

stories.add(
  "Default",
  () => (
    <PromotionPrizeTable />
  ),
  info({ text: "Default" })
);