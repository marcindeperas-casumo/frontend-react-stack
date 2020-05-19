// @flow
import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import * as A from "Types/apollo";
import { isMobile } from "Components/ResponsiveLayout";
import { GamesVirtualList } from "Components/GamesVirtualList";
import {
  GamesVirtualGrid,
  GamesVirtualGridSkeleton,
} from "Components/GamesVirtualGrid";
import { GameListSkeleton } from "Components/GameListSkeleton";
import { GameRow, GameRowText } from "Components/GameRow";
import { GameListPageQuery } from "./GameListPage.graphql";

type Props = {
  listId: string,
};

export function GameListPage({ listId }: Props) {
  const { data, loading } = useQuery<
    A.GameListPageQuery,
    A.GameListPageQueryVariables
  >(GameListPageQuery, {
    variables: { listId },
  });

  if (loading) {
    if (isMobile()) {
      return <GameListSkeleton numberOfItems={12} hasTitle={false} />;
    }

    return (
      <div className="t-background-white">
        <div className="o-wrapper u-padding-y--2xlg">
          <GamesVirtualGridSkeleton />
        </div>
      </div>
    );
  }

  if (!data || !data.gamesList) {
    return null;
  }

  const { games } = data.gamesList;

  if (isMobile) {
    return (
      <GamesVirtualList
        games={games}
        fetchMoreRows={Promise.resolve}
        rowCount={games.length}
        renderItem={game => (
          <GameRow
            game={game}
            renderText={() => <GameRowText name={game.name} />}
          />
        )}
      />
    );
  }

  return (
    <div className="t-background-white">
      <div className="o-wrapper u-padding-y--2xlg">
        <GamesVirtualGrid
          games={games}
          gamesCount={games.length}
          loadMore={Promise.resolve}
          pageSize={0}
        />
      </div>
    </div>
  );
}
