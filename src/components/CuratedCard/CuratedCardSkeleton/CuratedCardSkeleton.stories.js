// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { CuratedCardSkeleton } from "./CuratedCardSkeleton";

const stories = storiesOf("CuratedCard/CuratedCardSkeleton", module);

stories.add("Default", () => {
  return (
    <div
      className="u-margin-left--auto u-margin-right--auto"
      style={{ maxWidth: "686px" }}
    >
      <CuratedCardSkeleton />
    </div>
  );
});
