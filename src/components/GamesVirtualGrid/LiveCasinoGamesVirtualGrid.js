// @flow
import * as React from "react";
import * as A from "Types/apollo";
import { LiveCasinoCard } from "Components/LiveCasinoCard";
import { VirtualGrid } from "Components/VirtualGrid";

type Props = {
  games: Array<A.LiveCasinoCard>,
  gamesCount: number,
  loadMore: ({ startIndex: number, stopIndex: number }) => Promise<any>,
};

export const liveCasinoTileWidth = 328;
export const liveCasinoTileHeight = 298;

class OptimizedLiveCasinoCard extends React.Component<A.LiveCasinoCard> {
  shouldComponentUpdate(nextProps) {
    return this.props.id !== nextProps.id;
  }

  render() {
    return <LiveCasinoCard game={this.props} />;
  }
}

export const LiveCasinoGamesVirtualGrid = ({
  games,
  gamesCount,
  loadMore,
}: Props) => (
  <VirtualGrid
    loadMore={loadMore}
    numberOfEntries={gamesCount}
    dataList={games}
    spacerSize="sm"
    tileWidth={liveCasinoTileWidth}
    tileHeight={liveCasinoTileHeight}
    TileComponent={OptimizedLiveCasinoCard}
    tileLoadingElement={
      <div className="t-border-r--md t-background-grey-5 u-height--full u-width--full" />
    }
  />
);
