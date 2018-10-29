import { storiesOf } from "@storybook/react";
import React from "react";
import info from "Storybook/storybookInfo";
import CuratedCardSkeleton from "./CuratedCardSkeleton";

const stories = storiesOf("CuratedCardSkeleton", module);

stories.add(
  "Default",
  () => {
    return (
      <div
        className="u-margin-left--auto u-margin-right--auto"
        style={{ maxWidth: "686px" }}
      >
        <CuratedCardSkeleton />
      </div>
    );
  },
  info({ text: "Default" })
);
