// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { ProviderGamesList } from "./ProviderGamesList";
import { games } from "./__mocks__";
import "./ProviderGamesList.stories.scss";

const stories = storiesOf("ProviderGamesList", module);

stories.add("Default", () => (
  <MockStore>
    <ProviderGamesList
      loading={false}
      games={games}
      gamesCount={games.length}
      onLoadMore={() => {}}
    />
  </MockStore>
));

stories.add("Loading State", () => (
  <MockStore>
    <ProviderGamesList
      loading={true}
      games={[]}
      gamesCount={0}
      onLoadMore={() => {}}
    />
  </MockStore>
));
