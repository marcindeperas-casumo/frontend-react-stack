// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { viewports } from "Storybook/viewports";
import { ProviderGamesList } from "./ProviderGamesList";
import { games } from "./__mocks__";
import "./ProviderGamesList.stories.scss";

const stories = storiesOf("ProviderGamesList", module);
["mobile", "desktop"].forEach(viewport => {
  stories.add(
    `Default (${viewport})`,
    () => (
      <ProviderGamesList
        loading={false}
        games={games}
        gamesCount={games.length}
        onLoadMore={() => Promise.resolve(true)}
      />
    ),
    viewports[viewport]
  );

  stories.add(
    `Loading State (${viewport})`,
    () => (
      <ProviderGamesList
        loading={true}
        games={[]}
        gamesCount={0}
        onLoadMore={() => Promise.resolve(true)}
      />
    ),
    viewports[viewport]
  );
});
