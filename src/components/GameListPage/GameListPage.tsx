import Flex from "@casumo/cmp-flex";
import { ChipFilterable } from "@casumo/cmp-chip";
import { useQuery } from "@apollo/client";
import * as React from "react";
import classNames from "classnames";
import { useDispatch, useSelector } from "react-redux";
import * as A from "Types/apollo";
import { setData, getData } from "Models/gameBrowser";
import tracker from "Services/tracker";
import {
  EVENTS,
  EVENT_PROPS,
  EVENT_LOCATIONS,
  ROUTE_IDS,
  ROUTES,
} from "Src/constants";
import TrackClick from "Components/TrackClick";
import TrackProvider from "Components/TrackProvider";
import { loadMoreConstructor, interpolate } from "Utils";
import { useTranslations } from "Utils/hooks";
import { isMobile } from "Components/ResponsiveLayout";
import { GamesVirtualList } from "Components/GamesVirtualList";
import {
  GamesVirtualGrid,
  GamesVirtualGridSkeleton,
} from "Components/GamesVirtualGrid";
import { GameListSkeleton } from "Components/GameListSkeleton";
import { navigate } from "Services/NavigationService";
import {
  useCurrentGamePage,
  useSetScrollPosition,
} from "Components/Router/GameBrowser";
import { GameRow, GameRowText } from "Components/GameRow";
import { xPaddingClasses } from "Components/GameListHorizontal/constants";
import { GameListPageQuery } from "./GameListPage.graphql";
import { GameListPageFilters } from "./GameListPageFilters";
import { GameListPageSort } from "./GameListPageSort";
import { findQueryTranslation, getAppliedFilters } from "./GameListPage.utils";

type Props = {
  path?: string;
  parent: string;
  set: A.GetGameSetsQuery["gameSetsList"][number];
};

// eslint-disable-next-line sonarjs/cognitive-complexity, max-lines-per-function
export function GameListPage({ set, parent }: Props) {
  const t = useTranslations<{
    title: string;
    modal_button: string;
  }>("new-game-browser.filtering");
  const page = useCurrentGamePage(parent);
  const { filters: defaultFilters, sort: defaultSort } = useSelector(
    getData(parent)
  );
  const dispatch = useDispatch();
  const isLiveCasino = set.gameDisplayMode === "LIVE_CASINO";

  React.useEffect(() => {
    if (isLiveCasino) {
      navigate({
        url: ROUTES[ROUTE_IDS.LIVE_CASINO],
      });
    }
  }, [isLiveCasino]);

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
      setData(parent)({
        page,
        // @ts-expect-error ts-migrate(2345) FIXME: Argument of type '{ page: string; sort: A.GamesSor... Remove this comment to see the full error message
        sort,
        filters,
      })
    );
  }, [sort, filters, dispatch, page, parent]);

  const query = [set.baseQuery, sortOrder, ...f].join("&");
  const [listHash, setListHash] = React.useState("");
  const openFilter = () => {
    tracker.track(EVENTS.MIXPANEL_GAME_SET_FILTERING_CLICKED, {});
    setFiltersVisibility(true);
  };

  const { data, fetchMore, loading } = useQuery<
    A.GameListPageQuery,
    A.GameListPageQueryVariables
  >(GameListPageQuery, {
    variables: {
      query,
      offset: 0,
      limit: 48,
    },
    fetchPolicy: "cache-first",
    errorPolicy: "ignore",
  });

  React.useEffect(() => {
    if (!loading) {
      setListHash(query);
    }
  }, [loading]); // eslint-disable-line react-hooks/exhaustive-deps

  const loadMore = loadMoreConstructor(fetchMore);
  useSetScrollPosition(parent, loading);

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
      // @ts-expect-error ts-migrate(2746) FIXME: This JSX tag's 'children' prop expects a single ch... Remove this comment to see the full error message
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
        <div
          className={classNames("u-padding--md@mobile", {
            "bg-white": isMobile(),
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
            <div className="bg-white">
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
    !isLiveCasino && (
      <>
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
              return <GamesVirtualGridSkeleton />;
            }

            const { games, gamesCount } = data.getGamesPaginated;
            const props = {
              games,
              gamesCount,
              loadMore,
            };

            return (
              <TrackProvider
                data={{
                  [EVENT_PROPS.LOCATION]: interpolate(
                    EVENT_LOCATIONS.GAME_SET,
                    {
                      location: set.key,
                    }
                  ),
                }}
              >
                <GamesVirtualGrid {...props} />
              </TrackProvider>
            );
          })()}
        </div>
      </>
    )
  );
}

type SProps = {
  sort: A.GamesSortOrder | undefined;
  setSort: (sortOrder: A.GamesSortOrder) => void;
  supportedSorts: Array<A.GamesSortOrder>;
  additionalFilterGroups: A.GetGameSetsQuery["gameSetsList"][number]["additionalFilterGroups"];
  filters: { [filter: string]: boolean };
  setFilters: (filters: { [filter: string]: boolean }) => void;
  openFilter: () => void;
  openFilterText: string;
  appliedFilters: Array<string>;
};
function SortAndFilterSection(props: SProps) {
  return (
    <Flex className="o-flex--wrap c-games-list-filter">
      {props.supportedSorts.length !== 0 && (
        <TrackClick eventName={EVENTS.MIXPANEL_GAME_SET_SORTING_CLICKED}>
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
