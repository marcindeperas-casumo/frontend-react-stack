import * as React from "react";
import classNames from "classnames";
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
import { xPaddingClasses } from "Components/GameListHorizontal/constants";
// @ts-expect-error ts-migrate(2307) FIXME: Cannot find module './GameListPage.graphql' or its... Remove this comment to see the full error message
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
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ page: string; sort: A.GamesSor... Remove this comment to see the full error message
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

  // @ts-expect-error ts-migrate(2339) FIXME: Property 'data' does not exist on type 'void'.
  const { data, fetchMore, loading } = useCachedQuery<
    A.GameListPageQuery,
    A.GameListPageQueryVariables
  >(
    // @ts-expect-error ts-migrate(2554) FIXME: Expected 0 arguments, but got 3.
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
      // @ts-expect-error ts-migrate(2322) FIXME: Type '(s: any) => void' is not assignable to type ... Remove this comment to see the full error message
      setSort={setSort}
      supportedSorts={set.supportedSorts}
      additionalFilterGroups={set.additionalFilterGroups}
      filters={filters}
      // @ts-expect-error ts-migrate(2739) FIXME: Type '(f: any) => void' is missing the following p... Remove this comment to see the full error message
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
        {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'void' is missing in type '{ isOpen: bool... Remove this comment to see the full error message */}
        <GameListPageFilters
          isOpen={filtersVisible}
          setFilters={setFilters}
          close={() => setFiltersVisibility(false)}
          availableFilters={set.additionalFilterGroups}
          activeFilters={filters}
          numberOfGames={data?.getGamesPaginated.gamesCount || 0}
        />
        <div
          className={classNames("u-padding--md@mobile", {
            "t-background-white": isMobile(),
          })}
        >
          {topSection}
        </div>
        {(() => {
          if (!data || !data.getGamesPaginated.games) {
            return <GameListSkeleton numberOfItems={12} hasTitle={false} />;
          }

          const { games, gamesCount } = data.getGamesPaginated;

          return (
            <div className="t-background-white">
              {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'Promise' is missing in type '{ games: an... Remove this comment to see the full error message */}
              <GamesVirtualList
                games={games}
                fetchMoreRows={loadMore}
                listHash={listHash}
                rowCount={gamesCount}
                renderItem={game => (
                  <GameRow
                    game={game}
                    renderText={() => (
                      <GameRowText
                        name={game.name}
                        description={game.gameStudio}
                      />
                    )}
                  />
                )}
              />
            </div>
          );
        })()}
      </TrackProvider>
    );
  }

  return (
    <>
      {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'void' is missing in type '{ isOpen: bool... Remove this comment to see the full error message */}
      <GameListPageFilters
        isOpen={filtersVisible}
        setFilters={setFilters}
        close={() => setFiltersVisibility(false)}
        availableFilters={set.additionalFilterGroups}
        activeFilters={filters}
        numberOfGames={data?.getGamesPaginated.gamesCount || 0}
      />

      <div className={classNames("o-wrapper", xPaddingClasses)}>
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
    </>
  );
}

type SProps = {
  sort: ?A.GamesSortOrder,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'void'.
  setSort: A.GamesSortOrder => void,
  supportedSorts: Array<A.GamesSortOrder>,
  additionalFilterGroups: Array<A.GetGameSets_gameSetsList_additionalFilterGroups>,
  // @ts-expect-error ts-migrate(2339) FIXME: Property 'GetGameSets_gameSetsList_additionalFilte... Remove this comment to see the full error message
  filters: { [A.GetGameSets_gameSetsList_additionalFilterGroups]: boolean },
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'void'.
  setFilters: A.GetGameSets_gameSetsList_additionalFilterGroups => void,
  openFilter: () => void,
  openFilterText: string,
  appliedFilters: Array<string>,
};
function SortAndFilterSection(props: SProps) {
  return (
    <Flex className="o-flex--wrap c-games-list-filter">
      {props.supportedSorts.length !== 0 && (
        <TrackClick eventName={EVENTS.MIXPANEL_GAME_SET_SORTING_CLICKED}>
          {/* @ts-expect-error ts-migrate(2741) FIXME: Property 'void' is missing in type '{ setSort: Gam... Remove this comment to see the full error message */}
          <GameListPageSort
            setSort={props.setSort}
            supportedSorts={props.supportedSorts}
            sort={props.sort}
          />
        </TrackClick>
      )}
      {props.additionalFilterGroups.length !== 0 && (
        <>
          {props.appliedFilters.map(x => (
            <Flex key={x} className="u-margin-right u-margin-bottom">
              <ChipFilterable
                isActive
                onRemove={() =>
                  // @ts-expect-error ts-migrate(2349) FIXME: This expression is not callable.
                  props.setFilters({ ...props.filters, [x]: false })
                }
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
        </>
      )}
    </Flex>
  );
}
