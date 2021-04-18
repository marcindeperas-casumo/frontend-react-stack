import { storiesOf } from "@storybook/react";
import React from "react";
// import { viewports } from "Storybook/viewports";

const viewports = { mobile: null, desktop: null, tablet: null, phablet: null };
import MockStore from "Components/MockStore";
import { ProviderGamesList } from "./ProviderGamesList";
import { games } from "./__mocks__";
import "./ProviderGamesList.stories.scss";

const stories = storiesOf("ProviderGamesList", module);
["mobile", "desktop"].forEach(viewport => {
  stories.add(
    `Default (${viewport})`,
    () => (
      <MockStore>
        <ProviderGamesList
          loading={false}
          games={games}
          gamesCount={games.length}
          onLoadMore={() => Promise.resolve(true)}
        />
      </MockStore>
    ),
    viewports[viewport]
  );

  stories.add(
    `Loading State (${viewport})`,
    () => (
      <MockStore>
        <ProviderGamesList
          loading={true}
          games={[]}
          gamesCount={0}
          onLoadMore={() => Promise.resolve(true)}
        />
      </MockStore>
    ),
    viewports[viewport]
  );
});
