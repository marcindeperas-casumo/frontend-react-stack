// @flow
import * as React from "react";
import * as R from "ramda";
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
  set: A.GetGameSets_gameSetsList,
};

const gamesLense = R.lensPath(["getGamesForSet", "games"]);
export function insertIntoArray(newData: Array<any>, offset: number) {
  return R.pipe(
    R.remove(offset, newData.length),
    R.insertAll(offset, newData)
  );
}

export function GameListPage({ set }: Props) {
  const { data, loading, fetchMore } = useQuery<
    A.GameListPageQuery,
    A.GameListPageQueryVariables
  >(GameListPageQuery, {
    variables: {
      query: set.baseQuery,
      offset: 0,
      limit: 48,
    },
  });
  const loadMore = ({ startIndex, stopIndex }) =>
    fetchMore<A.GameListPageQueryVariables>({
      variables: {
        offset: startIndex,
        limit: stopIndex - startIndex,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) {
          return prev;
        }

        const insertNewGames = insertIntoArray(
          fetchMoreResult.getGamesForSet.games,
          fetchMoreResult.getGamesForSet.offset
        );

        return R.over(
          gamesLense,
          prevGames => {
            if (prevGames.length !== gamesCount) {
              return R.pipe(
                insertIntoArray(prevGames, 0),
                insertNewGames
              )(new Array(gamesCount));
            }

            return insertNewGames(prevGames);
          },
          prev
        );
      },
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

  if (!data || !data.getGamesForSet.games) {
    return null;
  }
  const { games, gamesCount } = data.getGamesForSet;

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
          gamesCount={gamesCount}
          loadMore={loadMore}
        />
      </div>
    </div>
  );
}
