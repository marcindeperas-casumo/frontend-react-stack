// @flow
import * as React from "react";
import * as R from "ramda";
import { useQuery } from "@apollo/react-hooks";
import Flex from "@casumo/cmp-flex";
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
import { GameListPageSort } from "./GameListPageSort";

type Props = {
  set: A.GetGameSets_gameSetsList,
};

const gamesLense = R.lensPath(["getGamesPaginated", "games"]);
export function insertIntoArray(newData: Array<any>, offset: number) {
  return R.pipe(
    R.remove(offset, newData.length),
    R.insertAll(offset, newData)
  );
}

const loadMoreConstructor = (fetchMore, gamesCount) => ({
  startIndex,
  stopIndex,
}) => {
  const tmpLimit = stopIndex - startIndex;
  const limit = tmpLimit > 99 ? 100 : tmpLimit || 1; // it blows up above 100
  const offset = limit === 100 ? stopIndex - startIndex : startIndex;

  return fetchMore<A.GameListPageQueryVariables>({
    variables: { offset, limit },
    updateQuery: (prev, { fetchMoreResult }) => {
      if (!fetchMoreResult) {
        return prev;
      }

      const insertNewGames = insertIntoArray(
        fetchMoreResult.getGamesPaginated.games,
        fetchMoreResult.getGamesPaginated.offset
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
};

export function GameListPage({ set }: Props) {
  const [sort, setSort] = React.useState<?A.GamesSortOrder>(null);
  const sortOrder = `sortOrder=${sort || set.defaultSort}`;

  const { data, loading, fetchMore } = useQuery<
    A.GameListPageQuery,
    A.GameListPageQueryVariables
  >(GameListPageQuery, {
    variables: {
      query: [set.baseQuery, sortOrder].join("&"),
      offset: 0,
      limit: 48,
    },
  });

  const selectCmp = (
    <Flex className="o-flex--wrap">
      <GameListPageSort
        setSort={setSort}
        supportedSorts={set.supportedSorts}
        sort={sort}
      />
    </Flex>
  );

  if (isMobile()) {
    return (
      <div className="t-background-white">
        <div className="o-wrapper u-padding--md@mobile">{selectCmp}</div>
        {(() => {
          if (loading) {
            return <GameListSkeleton numberOfItems={12} hasTitle={false} />;
          } else if (!data || !data.getGamesPaginated.games) {
            return null;
          }

          const { games, gamesCount } = data.getGamesPaginated;

          return (
            <GamesVirtualList
              games={games}
              fetchMoreRows={loadMoreConstructor(
                fetchMore,
                data.getGamesPaginated.gamesCount
              )}
              rowCount={gamesCount}
              renderItem={game => (
                <GameRow
                  game={game}
                  renderText={() => <GameRowText name={game.name} />}
                />
              )}
            />
          );
        })()}
      </div>
    );
  }

  return (
    <div className="t-background-white">
      <div className="o-wrapper u-padding-y--lg">
        <div className="u-padding-bottom--lg">{selectCmp}</div>
        {(() => {
          if (loading) {
            return <GamesVirtualGridSkeleton />;
          } else if (!data || !data.getGamesPaginated.games) {
            return null;
          }
          const { games, gamesCount } = data.getGamesPaginated;

          return (
            <GamesVirtualGrid
              games={games}
              gamesCount={gamesCount}
              loadMore={loadMoreConstructor(
                fetchMore,
                data.getGamesPaginated.gamesCount
              )}
            />
          );
        })()}
      </div>
    </div>
  );
}
