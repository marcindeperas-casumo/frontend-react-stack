// @flow
import React, { PureComponent } from "react";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";
import { range, assoc } from "ramda";
import Flex from "@casumo/cmp-flex";
import GameRowSkeleton from "Components/GameRowSkeleton";

const ROW_HEIGHT = 80;
const PAGE_SIZE = 101; // 0 - 99, startIndex should be 100 for second
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

type State = {
  loadedRowsMap: {},
};

class GamesVirtualList extends PureComponent<Props, State> {
  state = {
    loadedRowsMap: {},
  };

  isRowLoaded = ({ index }: { index: number }) => {
    const { loadedRowsMap } = this.state;

    return Boolean(loadedRowsMap[index]);
  };

  loadMoreRows = ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number,
    stopIndex: number,
  }) => {
    const { fetchNextPage, remoteRowsCount } = this.props;

    range(startIndex, stopIndex).forEach(i => {
      this.setState(prevState => {
        return {
          loadedRowsMap: {
            ...prevState.loadedRowsMap,
            ...assoc(i, 0, this.state.loadedRowsMap),
          },
        };
      });
    });

    fetchNextPage({
      startIndex,
      stopIndex,
      pageSize: PAGE_SIZE,
    });

    // this fixes last row not loading because last stopIndex is minus 1 out of remoteRowsCount?
    const stop =
      remoteRowsCount - stopIndex === 1 ? remoteRowsCount : stopIndex;

    range(startIndex, stop).forEach(i => {
      this.setState(prevState => {
        return {
          loadedRowsMap: {
            ...prevState.loadedRowsMap,
            ...assoc(i, 1, this.state.loadedRowsMap),
          },
        };
      });
    });
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

    if (!this.isRowLoaded({ index })) {
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
    }

    return (
      <div key={key} index={index} style={style}>
        {renderItem(games[index])}
      </div>
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
