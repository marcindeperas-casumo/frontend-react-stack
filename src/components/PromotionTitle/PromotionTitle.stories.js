// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";

import PromotionTitle from "Components/PromotionTitle";

const stories = storiesOf("PromotionTitle", module);

stories.add(
  "Default",
  () => (
    <PromotionTitle
      title="Christmas Countdown"
      dates="17 Dec  - 30 Dec 2018"
      badge="https://cms.casumo.com/wp-content/uploads/2018/11/promotions-jackpot.svg"
    />
  ),
  info({ text: "Default" })
);

stories.add(
  "Without Badge",
  () => (
    <PromotionTitle title="Christmas Countdown" dates="17 Dec  - 30 Dec 2018" />
  ),
  info({ text: "Without Badge" })
);
