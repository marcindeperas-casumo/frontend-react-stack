// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import MockStore from "Components/MockStore";
import { games } from "Components/GamesVirtualList/__mock__";
import { GamesVirtualGrid } from "./GamesVirtualGrid";
import { GamesVirtualGridSkeleton } from "./GamesVirtualGridSkeleton";

const stories = storiesOf("GamesVirtualGrid", module);

stories.add("Default", () => (
  <MockStore>
    <GamesVirtualGrid
      games={games}
      gamesCount={games.length}
      loadMore={() => Promise.resolve(null)}
      pageSize={100}
    />
  </MockStore>
));

stories.add("Skeleton", () => <GamesVirtualGridSkeleton />);
