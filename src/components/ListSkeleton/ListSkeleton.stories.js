// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import ListSkeleton from "Components/ListSkeleton/ListSkeleton";

const stories = storiesOf("ListSkeleton", module);

const ListSkeletonStories = () => (
  <MockStore>
    <ListSkeleton />
  </MockStore>
);

stories.add(
  "ListSkeleton",
  ListSkeletonStories,
  info({ text: "Displays the must drop jackpots skeleton" })
);
