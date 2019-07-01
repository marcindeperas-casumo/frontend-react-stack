// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import ScrollableListPaginated from "Components/ScrollableListPaginated";
import MockStore from "Components/MockStore";
import GameTileContainer from "Components/GameTile";

const stories = storiesOf("ScrollableListPaginated", module);
const list = {
  games: [
    "book-of-ra-deluxe",
    "diamond-mine",
    "raging-rhino",
    "jammin-jars",
    "legacy-of-egypt",
    "big-bad-wolf",
    "starburst",
  ],
  id: "popularGames",
  title: "Popular",
};

const ScrollablePaginatedStory = () => {
  return (
    <MockStore>
      <ScrollableListPaginated
        list={list}
        tileHeight={204}
        className="c-top-game"
        seeMoreText="Aw gidi"
        seeMoreUrl="whatever"
        Component={GameTileContainer}
      />
    </MockStore>
  );
};

stories.add("ScrollablePaginated", ScrollablePaginatedStory);
