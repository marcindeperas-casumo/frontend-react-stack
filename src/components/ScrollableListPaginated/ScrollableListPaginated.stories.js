// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import MockStore from "Components/MockStore";
import { GameTile as GameTileContainer } from "Components/GameTile";

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

const ScrollableListPaginatedStory = () => {
  return (
    <MockStore>
      <ScrollableListPaginated
        list={{
          id: list.id,
          title: list.title,
          itemIds: list.games,
        }}
        tileHeight={204}
        className="c-top-game"
        itemControlClass="c-scrollable-list-paginated__button"
        seeMore={{
          url: "whatever",
          text: "Aw gidi",
        }}
        Component={GameTileContainer}
      />
    </MockStore>
  );
};

stories.add("ScrollableListPaginated", ScrollableListPaginatedStory);
