// @flow
import React, { PureComponent } from "react";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";
import { range, assoc } from "ramda";
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
};

type State = {
  loadedRowsMap: {},
};

class GamesVirtualList extends PureComponent<Props, State> {
  promises = [];
  state = {
    loadedRowsMap: {},
  };

  componentDidUpdate() {
    const { games } = this.props;
    const isPromiseLoaded = ({ startIndex, stopIndex }) =>
      games[startIndex] && games[stopIndex];
    const loadedPromises = this.promises.filter(isPromiseLoaded);
    const notLoadedPromises = this.promises.filter(o => !isPromiseLoaded(o));

    loadedPromises.forEach(({ resolve }) => resolve());

    // eslint-disable-next-line
    this.promises = notLoadedPromises;
  }

  isRowLoaded = ({ index }: { index: number }) => {
    const { loadedRowsMap } = this.state;

    return Boolean(loadedRowsMap[index]);
  };

  setRowsAsLoaded = ({ startIndex, stopIndex }) => {
    range(startIndex, stopIndex).forEach(i => {
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

  loadMoreRows = ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number,
    stopIndex: number,
  }) => {
    const { fetchNextPage } = this.props;

    fetchNextPage({
      startIndex,
      stopIndex,
    });

    this.setRowsAsLoaded({ startIndex, stopIndex });

    return new Promise(resolve => {
      // eslint-disable-next-line
      const promise = {
        startIndex,
        stopIndex,
        resolve,
      };

      // eslint-disable-next-line
      this.promises.push(promise);
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
