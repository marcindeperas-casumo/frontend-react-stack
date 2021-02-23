// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import PromotionHeaderImage from "Components/PromotionHeaderImage";

const stories = storiesOf("PromotionHeaderImage", module);

stories.add("Default", () => (
  <div style={{ maxWidth: 546 }}>
    <PromotionHeaderImage
      image="https://cms.casumo.com/wp-content/uploads/2018/11/boosted-reel-races.png"
      badge=""
    />
  </div>
));

stories.add("With Badge", () => (
  <div style={{ maxWidth: 546 }}>
    <PromotionHeaderImage
      image="https://cms.casumo.com/wp-content/uploads/2018/11/winter-games-scenery.png"
      badge="https://cms.casumo.com/wp-content/uploads/2018/11/winter-games-emblem.svg"
    />
  </div>
));
