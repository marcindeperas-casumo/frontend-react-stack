// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ChipFilterable } from "@casumo/cmp-chip";
import { useDispatch, useSelector } from "react-redux";
import { setData, getData } from "Models/gameBrowser";
import * as A from "Types/apollo";
import { useCachedQuery } from "Utils/hooks";
import { isMobile } from "Components/ResponsiveLayout";
import { GamesVirtualList } from "Components/GamesVirtualList";
import {
  GamesVirtualGrid,
  GamesVirtualGridSkeleton,
  LiveCasinoGamesVirtualGrid,
  LiveCasinoGamesVirtualGridSkeleton,
} from "Components/GamesVirtualGrid";
import { GameListSkeleton } from "Components/GameListSkeleton";
import {
  useCurrentGamePage,
  useSetScrollPosition,
} from "Components/Router/GameBrowser";
import { GameRow, GameRowText } from "Components/GameRow";
import { GameListPageQuery } from "./GameListPage.graphql";
import { GameListPageFilters } from "./GameListPageFilters";
import { GameListPageSort } from "./GameListPageSort";

type Props = {
  set: A.GetGameSets_gameSetsList,
};

/* eslint-disable-next-line sonarjs/cognitive-complexity */
export function GameListPage({ set }: Props) {
  const page = useCurrentGamePage();
  const { filters: defaultFilters, sort: defaultSort } = useSelector(getData);
  const dispatch = useDispatch();
  const isLiveCasino = set.title === "Live Casino";
  const [sort, setSort] = React.useState<A.GamesSortOrder | null>(defaultSort);
  const [filters, setFilters] = React.useState<{}>(defaultFilters);
  const [filtersVisible, setFiltersVisibility] = React.useState(false);
  const sortOrder = `sortOrder=${sort || set.defaultSort}`;
  const f = Object.entries(filters)
    .filter(([key, val]) => val)
    .map(([key]) => key);
  React.useEffect(() => {
    dispatch(
      setData({
        page,
        sort,
        filters,
      })
    );
  }, [sort, filters, dispatch, page]);
  useSetScrollPosition();

  const { data, loading, loadMore } = useCachedQuery<
    A.GameListPageQuery,
    A.GameListPageQueryVariables
  >(
    GameListPageQuery,
    {
      variables: {
        query: [set.baseQuery, sortOrder, ...f].join("&"),
        offset: 0,
        limit: 48,
      },
      ...(isLiveCasino ? { pollInterval: 5000 } : {}),
    },
    {
      list: ["getGamesPaginated", "games"],
      count: ["getGamesPaginated", "gamesCount"],
      offset: ["getGamesPaginated", "offset"],
    }
  );

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
            if (!data || !data.getGamesPaginated.games) {
              if (loading) {
                return <GameListSkeleton numberOfItems={12} hasTitle={false} />;
              }

              return null;
            }

            const { games, gamesCount } = data.getGamesPaginated;

            return (
              <GamesVirtualList
                games={games}
                fetchMoreRows={loadMore}
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
            if (!data || !data.getGamesPaginated.games) {
              if (loading) {
                if (isLiveCasino) {
                  return <LiveCasinoGamesVirtualGridSkeleton />;
                }

                return <GamesVirtualGridSkeleton />;
              }

              return null;
            }

            const { games, gamesCount } = data.getGamesPaginated;
            const props = {
              games,
              gamesCount,
              loadMore,
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
