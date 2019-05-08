// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";
import { GameListSkeleton } from "Components/GameListSkeleton/GameListSkeleton";

const stories = storiesOf("GameListSkeleton", module);

const ListSkeletonStories = () => (
  <MockStore>
    <GameListSkeleton />
  </MockStore>
);

if (isNotChromatic) {
  stories.add(
    "GameListSkeleton",
    ListSkeletonStories,
    info({ text: "Displays the must drop jackpots skeleton" })
  );
}
