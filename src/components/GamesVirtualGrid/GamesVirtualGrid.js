// @flow
import * as React from "react";
import * as R from "ramda";
import * as A from "Types/apollo";
import { GameTile } from "Components/GameTile";
import { VirtualGrid } from "Components/VirtualGrid";

type Props = {
  games: Array<A.GameTile_Game>,
  gamesCount: number,
  loadMore: ({ startIndex: number, stopIndex: number }) => Promise<any>,
};

export const gameTileWidth = 160;
export const gameTileHeight = 192;

const OptimizedGameTile = React.memo(
  props => <GameTile game={props} />,
  R.eqProps("id")
);

export const GamesVirtualGrid = ({ games, gamesCount, loadMore }: Props) => (
  <VirtualGrid
    loadMore={loadMore}
    numberOfEntries={gamesCount}
    dataList={games}
    spacerSize="sm"
    tileWidth={gameTileWidth}
    tileHeight={gameTileHeight}
    TileComponent={OptimizedGameTile}
    tileLoadingElement={
      <div className="t-border-r--md t-background-grey-5 u-height--full u-width--full" />
    }
  />
);
