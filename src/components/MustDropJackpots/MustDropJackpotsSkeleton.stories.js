import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import MustDropJackpotsSkeleton from "Components/MustDropJackpots/MustDropJackpotsSkeleton";

const stories = storiesOf("MustDropJackpots Skeleton", module);

const MustDropJackpotsSkeletonStories = () => (
  <MockStore>
    <MustDropJackpotsSkeleton />
  </MockStore>
);

stories.add(
  "MustDropJackpotsSkeleton",
  MustDropJackpotsSkeletonStories,
  info({ text: "Displays the must drop jackpots skeleton" })
);
