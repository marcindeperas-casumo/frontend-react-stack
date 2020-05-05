// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import { EVENT_PROPS, ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import VirtualList from "Components/VirtualList";
import { isMobile } from "Components/ResponsiveLayout";
import {
  GamesVirtualGrid,
  GamesVirtualGridSkeleton,
} from "Components/GamesVirtualGrid";
import { ProviderGamesListSkeleton } from "./ProviderGamesListSkeleton";
import {
  ProviderGamesListRow,
  ProviderGamesListRowSkeleton,
} from "./ProviderGamesListRow";
import "./ProviderGamesList.scss";

type Props = {
  loading: boolean,
  studioName: string,
  games: Array<Object>,
  gamesCount: number,
  // __FIX__ Check if this ANY here can be solved in a REASONABLE amount of time.
  onLoadMore: () => Promise<any>,
};

export const PAGE_SIZE = 20;
export const ROW_HEIGHT = 72;

// Called by react-virtualized
const renderRow = ({ games, key, index, style }) => {
  return games[index] ? (
    <ProviderGamesListRow key={key} style={style} game={games[index]} />
  ) : (
    <ProviderGamesListRowSkeleton key={key} style={style} />
  );
};

export const ProviderGamesList = ({
  loading = true,
  studioName = "",
  games = [],
  gamesCount = 0,
  onLoadMore,
}: Props) => {
  if (loading) {
    if (isMobile()) {
      return <ProviderGamesListSkeleton />;
    }

    return (
      <div className="c-provider-games-list o-wrapper t-background-white u-padding--2xlg o-flex--vertical o-flex-align--center">
        <GamesVirtualGridSkeleton />
      </div>
    );
  }

  return (
    <TrackProvider
      data={{
        [EVENT_PROPS.LOCATION]: "Game Provider - Filtered Games Page",
      }}
    >
      <div className="c-provider-games-list">
        {isMobile ? (
          <VirtualList
            scrollElement={document.getElementById(ROOT_SCROLL_ELEMENT_ID)}
            isRowLoaded={({ index }) => Boolean(games[index])}
            pageSize={PAGE_SIZE}
            rowHeight={ROW_HEIGHT}
            totalNumberOfRows={gamesCount}
            loadMoreRows={onLoadMore}
            rowRenderer={props => renderRow({ games, ...props })}
          />
        ) : (
          <div className="o-wrapper t-background-white u-padding--2xlg o-flex--vertical o-flex-align--center">
            <Text
              size="lg"
              className="u-padding-bottom--2xlg u-font-weight-bold u-text-align-center"
            >
              {studioName}
            </Text>
            <GamesVirtualGrid
              games={games}
              gamesCount={gamesCount}
              loadMore={onLoadMore}
              pageSize={PAGE_SIZE}
            />
          </div>
        )}
      </div>
    </TrackProvider>
  );
};
