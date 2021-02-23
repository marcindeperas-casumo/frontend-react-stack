// @flow
import React from "react";
import { storiesOf } from "@storybook/react";
import { MockedProvider } from "@apollo/client/testing";
import { GameTile } from "Components/GameTile/GameTile";
import { gamesListMock } from "Components/GameListHorizontal/GameListHorizontalDefault/__mock__";
import { ScrollableListPaginated } from "./ScrollableListPaginated";

const stories = storiesOf("ScrollableListPaginated", module);

const ScrollableListPaginatedStory = () => {
  const itemRenderer = ({ style, columnIndex }) => (
    <div style={style}>
      <div style={{ width: "160px" }} className="u-margin-left--sm">
        {/* @ts-expect-error ts-migrate(2739) FIXME: Type '{ __typename: string; isInMaintenance: boole... Remove this comment to see the full error message */}
        <GameTile game={gamesListMock.games[columnIndex]} />
      </div>
    </div>
  );

  return (
    <MockedProvider>
      {/* @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call. */}
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
