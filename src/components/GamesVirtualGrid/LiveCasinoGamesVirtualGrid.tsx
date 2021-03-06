import * as React from "react";
import * as A from "Types/apollo";
import { LiveCasinoCardContainer } from "Components/LiveCasinoCard/LiveCasinoCardContainer";
import { VirtualGrid } from "Components/VirtualGrid";

type Props = {
  games: Array<A.LiveCasinoCardFragment>;
  gamesCount: number;
  loadMore: (x: { startIndex: number; stopIndex: number }) => Promise<any>;
};

export const liveCasinoTileWidth = 328;
export const liveCasinoTileHeight = 298;

class OptimizedLiveCasinoCard extends React.Component<A.LiveCasinoCardFragment> {
  shouldComponentUpdate(nextProps: A.LiveCasinoCardFragment) {
    return this.props.id !== nextProps.id;
  }

  render() {
    return <LiveCasinoCardContainer game={this.props} />;
  }
}

export const LiveCasinoGamesVirtualGrid = ({
  games,
  gamesCount,
  loadMore,
}: Props) => {
  const newGames = games.filter(x => {
    if (!x) {
      return true;
    } else if (x.gameStudio === "Evolution" && !x.liveCasinoLobby) {
      return false;
    }

    return true;
  });
  const filteredOut = games.length - newGames.length;

  return (
    <VirtualGrid
      loadMore={loadMore}
      numberOfEntries={gamesCount - filteredOut}
      dataList={newGames}
      spacerSize="sm"
      tileWidth={liveCasinoTileWidth}
      tileHeight={liveCasinoTileHeight}
      TileComponent={OptimizedLiveCasinoCard}
      tileLoadingElement={
        <div className="t-border-r--md bg-grey-5 u-height--full u-width--full" />
      }
    />
  );
};
