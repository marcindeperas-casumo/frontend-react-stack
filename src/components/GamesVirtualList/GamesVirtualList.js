// @flow
import React, { PureComponent } from "react";
import Flex from "@casumo/cmp-flex";
import GameRowSkeleton from "Components/GameRowSkeleton";

import { List, AutoSizer, InfiniteLoader } from "react-virtualized";
import { range, assoc } from "ramda";

const ROW_HEIGHT = 80;
const PAGE_SIZE = 100;
const THRESHOLD = 20;

type Props = {
  /** The array of games slugs to render within the AllGamesList */
  games: string[],
  /** The function that triggers the action that fetches the next batch of games */
  fetchNextPage: Function,
  /** The total number of rows */
  rowCount: number,
  /** The element to render as a row  */
  renderItem: Function,
};

type Indexes = {
  startIndex: number,
  stopIndex: number,
};

type State = {
  loadedRowsMap: {},
};

class GamesVirtualList extends PureComponent<Props, State> {
  promises = {
    list: [],
  };

  state = {
    loadedRowsMap: {},
  };

  componentDidUpdate() {
    const { games } = this.props;
    const isPromiseLoaded = ({ startIndex, stopIndex }) =>
      games[startIndex] && games[stopIndex];
    const loadedPromises = this.promises.list.filter(isPromiseLoaded);
    const notLoadedPromises = this.promises.list.filter(
      o => !isPromiseLoaded(o)
    );

    loadedPromises.forEach(({ resolve }) => resolve());

    // eslint-disable-next-line
    this.promises.list = notLoadedPromises;
  }

  isRowLoaded = ({ index }: { index: number }) => {
    const { loadedRowsMap } = this.state;

    return Boolean(loadedRowsMap[index]);
  };

  setRowsAsLoaded = ({ startIndex, stopIndex }: Indexes) => {
    const { rowCount } = this.props;
    // fix last row not loading
    const isLast = stopIndex + 1 === rowCount;
    const stop = isLast ? stopIndex + 1 : stopIndex;

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

  dispatchNextPage = ({ startIndex, stopIndex }: Indexes) =>
    this.props.fetchNextPage({
      startIndex,
      stopIndex,
      pageSize: PAGE_SIZE,
    });

  loadMoreRows = ({ startIndex, stopIndex }: Indexes) => {
    this.dispatchNextPage({
      startIndex,
      stopIndex,
      pageSize: PAGE_SIZE,
    });

    this.setRowsAsLoaded({ startIndex, stopIndex });

    return new Promise<Object>(resolve => {
      const promise = {
        startIndex,
        stopIndex,
        resolve,
      };

      // eslint-disable-next-line
      this.promises.list.push(promise);
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
      <div
        className="u-padding-horiz--md u-padding-vert t-border-bottom t-color-grey-light-2 t-border--current-color"
        key={key}
        index={index}
        style={style}
      >
        {renderItem(games[index])}
      </div>
    );
  };

  render() {
    const { rowCount } = this.props;

    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={rowCount}
        minimumBatchSize={PAGE_SIZE}
        threshold={THRESHOLD}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowCount={rowCount}
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
