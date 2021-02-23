// @flow
import * as React from "react";
import * as R from "ramda";
import * as A from "Types/apollo";
import { GameTileContainer as GameTile } from "Components/GameTile/GameTileContainer";
import { VirtualGrid } from "Components/VirtualGrid";

type Props = {
  games: Array<A.GameTile_Game>,
  gamesCount: number,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'number'.
  loadMore: ({ startIndex: number, stopIndex: number }) => Promise<any>,
};

export const gameTileWidth = 160;
export const gameTileHeight = 192;

const OptimizedGameTile = React.memo(
  // @ts-expect-error ts-migrate(2740) FIXME: Type '{ children?: ReactNode; }' is missing the fo... Remove this comment to see the full error message
  props => <GameTile game={props} />,
  // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
  R.eqProps("id")
);

export const GamesVirtualGrid = ({ games, gamesCount, loadMore }: Props) => (
  // @ts-expect-error ts-migrate(2604) FIXME: JSX element type 'VirtualGrid' does not have any c... Remove this comment to see the full error message
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
