// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { GameProvidersList } from "Components/GameProvidersList/GameProvidersList";
import GameProvidersListSkeleton from "Components/GameProvidersList/GameProvidersListSkeleton";
import GameProvidersListData from "./__mocks__/gameProvidersListData.json";

const stories = storiesOf("GameProvidersList", module);
const title = "Game Providers";

stories.add("Game Providers List (Presentational)", () => (
  <MockStore>
    {/* @ts-expect-error ts-migrate(2322) FIXME: Type '{ background: string; logo: string; url: str... Remove this comment to see the full error message */}
    <GameProvidersList title={title} gameStudios={GameProvidersListData} />
  </MockStore>
));

stories.add("Game Providers List Skeleton", () => (
  <GameProvidersListSkeleton />
));
