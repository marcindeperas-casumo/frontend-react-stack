// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import info from "Storybook/storybookInfo";
import GamesVirtualListContainer from "Components/GamesVirtualList";
import GamesVirtualList from "Components/GamesVirtualList/GamesVirtualList";
import MockStore from "Components/MockStore";
import isNotChromatic from "Storybook/isNotChromatic";
import GameRowSearch from "Components/GameRowSearch";

const stories = storiesOf("GamesVirtualList", module);

const gamesArray = ["easter-island", "starburst"];

if (isNotChromatic) {
  stories.add(
    "Default (Connected)",
    () => (
      <MockStore>
        <GamesVirtualListContainer
          games={gamesArray}
          renderItem={id => <GameRowSearch slug={id} />}
          fetchNextPage={() => {}}
        />
      </MockStore>
    ),
    info({ text: "Default" })
  );
}

stories.add(
  "Default",
  () => (
    <MockStore>
      <GamesVirtualList
        games={gamesArray}
        renderItem={id => <GameRowSearch slug={id} />}
        fetchNextPage={() => {}}
        rowCount={300}
      />
    </MockStore>
  ),
  info({ text: "Default" })
);
