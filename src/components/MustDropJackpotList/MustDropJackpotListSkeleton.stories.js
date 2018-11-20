import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import MustDropJackpotsSkeleton from "Components/MustDropJackpotList/MustDropJackpotListSkeleton";

const stories = storiesOf("MustDropJackpotList Skeleton", module);

const MustDropJackpotsSkeletonStories = () => (
  <MockStore>
    <MustDropJackpotsSkeleton />
  </MockStore>
);

stories.add(
  "MustDropJackpotListSkeleton",
  MustDropJackpotsSkeletonStories,
  info({ text: "Displays the must drop jackpots skeleton" })
);
