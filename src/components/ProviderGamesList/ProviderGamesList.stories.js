// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ProviderGamesList } from "./ProviderGamesList";
import { games } from "./__mocks__";
import "./ProviderGamesList.stories.scss";

const stories = storiesOf("ProviderGamesList", module);

stories.add("Default", () => (
  <ProviderGamesList
    loading={false}
    games={games}
    gamesCount={games.length}
    onLoadMore={() => Promise.resolve(true)}
  />
));

stories.add("Loading State", () => (
  <ProviderGamesList
    loading={true}
    games={[]}
    gamesCount={0}
    onLoadMore={() => Promise.resolve(true)}
  />
));
