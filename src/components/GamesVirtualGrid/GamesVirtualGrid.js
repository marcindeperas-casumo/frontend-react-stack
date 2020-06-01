// @flow
import * as React from "react";
import * as A from "Types/apollo";
import { GameTile } from "Components/GameTile";
import { VirtualGrid } from "Components/VirtualGrid";

type Props = {
  games: Array<A.GameTile_Game>,
  gamesCount: number,
  pageSize: number,
  loadMore: () => Promise<any>,
};

export const tileWidth = 160;
export const tileHeight = 192;

export const GamesVirtualGrid = ({
  games,
  gamesCount,
  pageSize,
  loadMore,
}: Props) => {
  return (
    <VirtualGrid
      dataList={games}
      spacerSize="sm"
      tileWidth={tileWidth}
      tileHeight={tileHeight}
      TileComponent={game => <GameTile game={game} />}
    />
  );
};
