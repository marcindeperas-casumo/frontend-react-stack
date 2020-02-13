// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { GameProvidersList } from "Components/GameProvidersList";
import GameProvidersListPresentational from "Components/GameProvidersList/GameProvidersList";
import GameProvidersListSkeleton from "Components/GameProvidersList/GameProvidersListSkeleton";
import isNotChromatic from "Storybook/isNotChromatic";
import GameProvidersListData from "./__mocks__/gameProvidersListData.json";

const stories = storiesOf("GameProvidersList", module);
const title = "Game Providers";

stories.add("Game Providers List (Presentational)", () => (
  <MockStore>
    <GameProvidersListPresentational
      title={title}
      gameStudios={GameProvidersListData}
    />
  </MockStore>
));

if (isNotChromatic) {
  stories.add("Game Providers List (Connected)", () => (
    <MockStore>
      <GameProvidersList title={"Game Providers"} type={"game-providers"} />
    </MockStore>
  ));
}

stories.add("Game Providers List Skeleton", () => (
  <GameProvidersListSkeleton />
));
