import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import React from "react";
import { GameTile } from "Components/GameTile/GameTile";
import { gamesListMock } from "Components/GameListHorizontal/GameListHorizontalDefault/__mock__";
import { ScrollableListPaginated } from "./ScrollableListPaginated";

const stories = storiesOf("ScrollableListPaginated", module);

const ScrollableListPaginatedStory = () => {
  const itemRenderer = ({ style, columnIndex }) => (
    <div style={style}>
      <div style={{ width: "160px" }} className="u-margin-left--sm">
        <GameTile game={gamesListMock.games[columnIndex]} />
      </div>
    </div>
  );

  return (
    <MockedProvider>
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
    </MockedProvider>
  );
};

stories.add("ScrollableListPaginated", ScrollableListPaginatedStory);
