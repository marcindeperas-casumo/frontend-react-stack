// @flow
import * as React from "react";
import { useQuery } from "@apollo/react-hooks";
import Flex from "@casumo/cmp-flex";
import { ChipFilterable } from "@casumo/cmp-chip";
import * as A from "Types/apollo";
import { loadMoreConstructor } from "Utils";
import { isMobile } from "Components/ResponsiveLayout";
import { GamesVirtualList } from "Components/GamesVirtualList";
import {
  GamesVirtualGrid,
  GamesVirtualGridSkeleton,
  LiveCasinoGamesVirtualGrid,
  LiveCasinoGamesVirtualGridSkeleton,
} from "Components/GamesVirtualGrid";
import { GameListSkeleton } from "Components/GameListSkeleton";
import { GameRow, GameRowText } from "Components/GameRow";
import { GameListPageQuery } from "./GameListPage.graphql";
import { GameListPageFilters } from "./GameListPageFilters";
import { GameListPageSort } from "./GameListPageSort";

type Props = {
  set: A.GetGameSets_gameSetsList,
};

/* eslint-disable-next-line sonarjs/cognitive-complexity */
export function GameListPage({ set }: Props) {
  const isLiveCasino = set.title === "Live Casino";
  const [sort, setSort] = React.useState<A.GamesSortOrder | null>(null);
  const [filters, setFilters] = React.useState<{}>({});
  const [filtersVisible, setFiltersVisibility] = React.useState(false);
  const sortOrder = `sortOrder=${sort || set.defaultSort}`;
  const f = Object.entries(filters)
    .filter(([key, val]) => val)
    .map(([key]) => key);

  const { data, loading, fetchMore } = useQuery<
    A.GameListPageQuery,
    A.GameListPageQueryVariables
  >(GameListPageQuery, {
    variables: {
      query: [set.baseQuery, sortOrder, ...f].join("&"),
      offset: 0,
      limit: 48,
    },
    ...(isLiveCasino ? { pollInterval: 5000 } : {}),
  });

  const selectCmp = (
    <Flex className="o-flex--wrap">
      <GameListPageSort
        setSort={setSort}
        supportedSorts={set.supportedSorts}
        sort={sort}
      />
      {f.map(x => (
        <Flex key={x} className="u-margin-right u-margin-bottom">
          <ChipFilterable
            isActive
            onRemove={() => setFilters({ ...filters, [x]: false })}
          >
            {x.split("=")[1]}
          </ChipFilterable>
        </Flex>
      ))}
      <Flex className="u-margin-right u-margin-bottom">
        <ChipFilterable onClick={() => setFiltersVisibility(true)}>
          Filters
        </ChipFilterable>
      </Flex>
    </Flex>
  );

  if (isMobile()) {
    return (
      <>
        <GameListPageFilters
          isOpen={filtersVisible}
          setFilters={setFilters}
          close={() => setFiltersVisibility(false)}
          availableFilters={set.additionalFilterGroups}
          activeFilters={filters}
          numberOfGames={data?.getGamesPaginated.gamesCount || 0}
        />
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
                listHash={sortOrder}
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
      </>
    );
  }

  return (
    <>
      <GameListPageFilters
        isOpen={filtersVisible}
        setFilters={setFilters}
        close={() => setFiltersVisibility(false)}
        availableFilters={set.additionalFilterGroups}
        activeFilters={filters}
        numberOfGames={data?.getGamesPaginated.gamesCount || 0}
      />
      <div className="t-background-white">
        <div className="o-wrapper u-padding-y--lg">
          <div className="u-padding-bottom--lg">{selectCmp}</div>
          {(() => {
            if (loading) {
              if (isLiveCasino) {
                return <LiveCasinoGamesVirtualGridSkeleton />;
              }

              return <GamesVirtualGridSkeleton />;
            } else if (!data || !data.getGamesPaginated.games) {
              return null;
            }
            const { games, gamesCount } = data.getGamesPaginated;
            const props = {
              games,
              gamesCount,
              loadMore: loadMoreConstructor(
                fetchMore,
                data.getGamesPaginated.gamesCount
              ),
            };

            if (isLiveCasino) {
              return <LiveCasinoGamesVirtualGrid {...props} />;
            }

            // $FlowIgnore: object has few extra fields
            return <GamesVirtualGrid {...props} />;
          })()}
        </div>
      </div>
    </>
  );
}
