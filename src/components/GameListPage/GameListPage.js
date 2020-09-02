// @flow
import * as React from "react";
import * as R from "ramda";
import Flex from "@casumo/cmp-flex";
import { ChipFilterable } from "@casumo/cmp-chip";
import { useDispatch, useSelector } from "react-redux";
import { setData, getData } from "Models/gameBrowser";
import * as A from "Types/apollo";
import tracker from "Services/tracker";
import { EVENTS } from "Src/constants";
import TrackClick from "Components/TrackClick";
import { loadMoreConstructor } from "Utils";
import { useCachedQuery, useTranslations } from "Utils/hooks";
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

/**
 * Each entry in `allFilters` array has array `values` inside.
 * Each entry in `values` has field `query`. Without bug/missing translation
 * there will always be one query that is equal to given `currentQuery`.
 *
 * Number of all queries to match is relatively low (under 100) so we're not
 * concerned about performance of this function.
 */
export function findQueryTranslation(
  currentQuery: string,
  allFilters: Array<A.GetGameSets_gameSetsList_additionalFilterGroups>
): string {
  return R.pipe(
    R.pluck("values"),
    R.flatten,
    R.find(R.propEq("query", currentQuery)),
    R.propOr(currentQuery, "title")
  )(allFilters);
}

const getAppliedFilters = filters =>
  Object.entries(filters)
    .filter(([key, val]) => val)
    .map(([key]) => key);

/* eslint-disable-next-line sonarjs/cognitive-complexity */
export function GameListPage({ set }: Props) {
  const t = useTranslations<{
    title: string,
    modal_button: string,
  }>("new-game-browser.filtering");
  const page = useCurrentGamePage();
  const { filters: defaultFilters, sort: defaultSort } = useSelector(getData);
  const dispatch = useDispatch();
  const isLiveCasino = set.key === "LIVE_CASINO";
  const [sort, setSortRaw] = React.useState<A.GamesSortOrder | null>(
    defaultSort
  );
  const setSort = s => {
    setSortRaw(s);
    tracker.track(EVENTS.MIXPANEL_GAME_SET_SORTING_OPTION_CLICKED, {
      sortOrder: s,
    });
  };
  const [filters, setFiltersRaw] = React.useState<{}>(defaultFilters);
  const setFilters = f => {
    setFiltersRaw(f);
    tracker.track(EVENTS.MIXPANEL_GAME_SET_FILTERING_OPTION_CLICKED, {
      filteringOption: getAppliedFilters(f).join("&"),
    });
  };
  const [filtersVisible, setFiltersVisibility] = React.useState(false);
  const sortOrder = `sortOrder=${sort || set.defaultSort}`;
  const f = getAppliedFilters(filters);
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

  const query = [set.baseQuery, sortOrder, ...f].join("&");
  const [listHash, setListHash] = React.useState("");
  const openFilter = () => {
    tracker.track(EVENTS.MIXPANEL_GAME_SET_FILTERING_CLICKED, {});
    setFiltersVisibility(true);
  };

  const { data, fetchMore, loading } = useCachedQuery<
    A.GameListPageQuery,
    A.GameListPageQueryVariables
  >(
    GameListPageQuery,
    {
      variables: {
        query,
        offset: 0,
        limit: 48,
      },
      ...(!isMobile() && isLiveCasino ? { pollInterval: 5000 } : {}),
    },
    ["getGamesPaginated", "games"]
  );
  React.useEffect(() => {
    if (!loading) {
      setListHash(query);
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = loadMoreConstructor(
    fetchMore,
    data?.getGamesPaginated.gamesCount || 0
  );

  const selectCmp = (
    <Flex className="o-flex--wrap">
      <TrackClick eventName={EVENTS.MIXPANEL_GAME_SET_SORTING_CLICKED}>
        <GameListPageSort
          setSort={setSort}
          supportedSorts={set.supportedSorts}
          sort={sort}
        />
      </TrackClick>
      {f.map(x => (
        <Flex key={x} className="u-margin-right u-margin-bottom">
          <ChipFilterable
            isActive
            onRemove={() => setFilters({ ...filters, [x]: false })}
          >
            {findQueryTranslation(x, set.additionalFilterGroups)}
          </ChipFilterable>
        </Flex>
      ))}
      <Flex className="u-margin-right u-margin-bottom">
        <ChipFilterable onClick={openFilter}>{t?.title || ""}</ChipFilterable>
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
              return <GameListSkeleton numberOfItems={12} hasTitle={false} />;
            }

            const { games, gamesCount } = data.getGamesPaginated;

            return (
              <GamesVirtualList
                games={games}
                fetchMoreRows={loadMore}
                listHash={listHash}
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
              if (isLiveCasino) {
                return <LiveCasinoGamesVirtualGridSkeleton />;
              }

              return <GamesVirtualGridSkeleton />;
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
