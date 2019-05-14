// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
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
  stories.add("GameListSkeleton", ListSkeletonStories);
}
