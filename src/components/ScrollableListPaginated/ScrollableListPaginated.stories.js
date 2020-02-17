// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { ScrollableListPaginated } from "Components/ScrollableListPaginated";
import { GameTile } from "Components/GameTile/GameTile";
import { gamesListMock } from "Components/GameListHorizontal/GameListHorizontalDefault/__mock__";

const stories = storiesOf("ScrollableListPaginated", module);

const ScrollableListPaginatedStory = () => {
  const itemRenderer = ({ style, columnIndex }) => (
    <div style={style}>
      <GameTile game={gamesListMock.games[columnIndex]} />
    </div>
  );
  return (
    <ScrollableListPaginated
      title={gamesListMock.name}
      itemCount={gamesListMock.games.length}
      tileHeight={204}
      itemControlClass="c-scrollable-list-paginated__button"
      seeMore={{
        url: "/aw-gidi",
        text: "Aw gidi",
      }}
      itemRenderer={itemRenderer}
    />
  );
};

stories.add("ScrollableListPaginated", ScrollableListPaginatedStory);
