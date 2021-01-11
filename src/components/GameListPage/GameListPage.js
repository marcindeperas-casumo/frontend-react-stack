// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ChipFilterable } from "@casumo/cmp-chip";
import { useDispatch, useSelector } from "react-redux";
import { setData, getData } from "Models/gameBrowser";
import * as A from "Types/apollo";
import tracker from "Services/tracker";
import { EVENTS, EVENT_PROPS, EVENT_LOCATIONS } from "Src/constants";
import TrackClick from "Components/TrackClick";
import TrackProvider from "Components/TrackProvider";
import { loadMoreConstructor, interpolate } from "Utils";
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
import { findQueryTranslation, getAppliedFilters } from "./GameListPage.utils";

type Props = {
  set: A.GetGameSets_gameSetsList,
};

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
  useSetScrollPosition(loading);

  const topSection = (
    <SortAndFilterSection
      sort={sort}
      setSort={setSort}
      supportedSorts={set.supportedSorts}
      additionalFilterGroups={set.additionalFilterGroups}
      filters={filters}
      setFilters={setFilters}
      openFilter={openFilter}
      openFilterText={t?.title || ""}
      appliedFilters={f}
    />
  );

  if (isMobile()) {
    return (
      <TrackProvider
        data={{
          [EVENT_PROPS.LOCATION]: interpolate(EVENT_LOCATIONS.GAME_SET, {
            location: set.key,
          }),
        }}
      >
        <GameListPageFilters
          isOpen={filtersVisible}
          setFilters={setFilters}
          close={() => setFiltersVisibility(false)}
          availableFilters={set.additionalFilterGroups}
          activeFilters={filters}
          numberOfGames={data?.getGamesPaginated.gamesCount || 0}
        />
        <div className="t-background-grey">
          <div className="o-wrapper u-padding--md@mobile">{topSection}</div>
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
      </TrackProvider>
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
      <div className="t-background-grey">
        <div className="o-wrapper">
          <div className="u-padding-bottom--xlg@desktop u-padding-bottom">
            {topSection}
          </div>
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
              // $FlowIgnore
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

type SProps = {
  sort: ?A.GamesSortOrder,
  setSort: A.GamesSortOrder => void,
  supportedSorts: Array<A.GamesSortOrder>,
  additionalFilterGroups: Array<A.GetGameSets_gameSetsList_additionalFilterGroups>,
  filters: { [A.GetGameSets_gameSetsList_additionalFilterGroups]: boolean },
  setFilters: A.GetGameSets_gameSetsList_additionalFilterGroups => void,
  openFilter: () => void,
  openFilterText: string,
  appliedFilters: Array<string>,
};
function SortAndFilterSection(props: SProps) {
  return (
    <Flex className="o-flex--wrap">
      <TrackClick eventName={EVENTS.MIXPANEL_GAME_SET_SORTING_CLICKED}>
        <GameListPageSort
          setSort={props.setSort}
          supportedSorts={props.supportedSorts}
          sort={props.sort}
        />
      </TrackClick>
      {props.appliedFilters.map(x => (
        <Flex key={x} className="u-margin-right u-margin-bottom">
          <ChipFilterable
            isActive
            onRemove={() => props.setFilters({ ...props.filters, [x]: false })}
          >
            {findQueryTranslation(x, props.additionalFilterGroups)}
          </ChipFilterable>
        </Flex>
      ))}
      <Flex className="u-margin-right u-margin-bottom">
        <ChipFilterable onClick={props.openFilter}>
          {props.openFilterText}
        </ChipFilterable>
      </Flex>
    </Flex>
  );
}
