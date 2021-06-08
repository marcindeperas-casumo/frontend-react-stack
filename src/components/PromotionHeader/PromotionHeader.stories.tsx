import { storiesOf } from "@storybook/react";
import React from "react";
import PromotionHeader from "Components/PromotionHeader";

const stories = storiesOf("PromotionHeader", module);

stories.add("Default", () => (
  <PromotionHeader
    title="Christmas Countdown"
    dates="17 Dec  - 30 Dec 2018"
    badge="https://cms.casumo.com/wp-content/uploads/2018/11/promotions-jackpot.svg"
  />
));

stories.add("Without Badge", () => (
  <PromotionHeader title="Christmas Countdown" dates="17 Dec  - 30 Dec 2018" />
));
