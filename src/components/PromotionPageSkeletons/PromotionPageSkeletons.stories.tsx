// @flow
import { storiesOf } from "@storybook/react";
import React from "react";
import PromotionPageSkeleton from "./PromotionPageSkeleton";

const stories = storiesOf("PromotionPageSkeleton", module);

stories.add("Promotions Page Skeleton", () => {
  return (
    <div
      className="u-margin-left--auto u-margin-right--auto"
      style={{ maxWidth: "686px" }}
    >
      <PromotionPageSkeleton />
    </div>
  );
});
