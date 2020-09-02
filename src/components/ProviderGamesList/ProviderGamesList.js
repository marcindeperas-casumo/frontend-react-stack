// @flow
import React from "react";
import { EVENT_PROPS, ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import TrackProvider from "Components/TrackProvider";
import VirtualList from "Components/VirtualList";
import { ProviderGamesListSkeleton } from "./ProviderGamesListSkeleton";
import {
  ProviderGamesListRow,
  ProviderGamesListRowSkeleton,
} from "./ProviderGamesListRow";
import "./ProviderGamesList.scss";

type Props = {
  loading: boolean,
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
  games = [],
  gamesCount = 0,
  onLoadMore,
}: Props) => {
  if (loading) {
    return <ProviderGamesListSkeleton />;
  }

  return (
    <TrackProvider
      data={{
        [EVENT_PROPS.LOCATION]: "Game Provider - Filtered Games Page",
      }}
    >
      <div className="c-provider-games-list">
        <VirtualList
          scrollElement={document.getElementById(ROOT_SCROLL_ELEMENT_ID)}
          isRowLoaded={({ index }) => Boolean(games[index])}
          pageSize={PAGE_SIZE}
          rowHeight={ROW_HEIGHT}
          totalNumberOfRows={gamesCount}
          loadMoreRows={onLoadMore}
          rowRenderer={props => renderRow({ games, ...props })}
        />
      </div>
    </TrackProvider>
  );
};
