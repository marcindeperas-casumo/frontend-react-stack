// @flow
import React, { PureComponent } from "react";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";

import Flex from "@casumo/cmp-flex";
import GameRowSkeleton from "Components/GameRowSkeleton";

const ROW_HEIGHT = 80;
const PAGE_SIZE = 100;
const THRESHOLD = 20;

type Props = {
  /** The array of games slugs to render within the AllGamesList */
  games: string[],
  /** The function that triggers the action that fetches the next batch of games */
  fetchNextPage: Function,
  /** The total number of rows */
  remoteRowsCount: number,
  /** The element to render as a row  */
  renderItem: Function,

  startIndexCursor: number,
};

class GamesVirtualList extends PureComponent<Props> {
  isRowLoaded = ({ index }: { index: number }) => {
    const { games } = this.props;

    return Boolean(games[index]);
  };

  loadMoreRows = ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number,
    stopIndex: number,
  }) => {
    const { fetchNextPage, remoteRowsCount } = this.props;

    fetchNextPage({ startIndex, remoteRowsCount, pageSize: PAGE_SIZE });
  };

  renderRow = ({
    key,
    index,
    style,
  }: {
    key: number,
    index: number,
    style: Object,
  }) => {
    const { renderItem, games } = this.props;

    if (this.isRowLoaded({ index })) {
      return (
        <div key={key} index={index} style={style}>
          {renderItem(games[index])}
        </div>
      );
    }

    return (
      <Flex
        className="u-padding-horiz--md"
        align="center"
        key={key}
        index={index}
        style={style}
      >
        <GameRowSkeleton />
      </Flex>
    );
  };

  render() {
    const { remoteRowsCount } = this.props;

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={remoteRowsCount}
        minimumBatchSize={PAGE_SIZE}
        threshold={THRESHOLD}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowCount={remoteRowsCount}
                width={width}
                height={height}
                rowHeight={ROW_HEIGHT}
                rowRenderer={this.renderRow}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

export default GamesVirtualList;
