// @flow
import React, { PureComponent } from "react";
import { range, assoc } from "ramda";

import Flex from "@casumo/cmp-flex";
import GameRowSkeleton from "Components/GameRowSkeleton";
import VirtualList from "Components/VirtualList";

const ROW_HEIGHT = 80;
const PAGE_SIZE = 100;

type Props = {
  /** The array of games slugs to render within the AllGamesList */
  games: string[],
  /** The function that triggers the action that fetches the next batch of games */
  preloadFetchPlayerGames: Function,
  preloadFetchPlayerGamesCount: Function,
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
  componentDidMount() {
    const { preloadFetchPlayerGamesCount } = this.props;

    preloadFetchPlayerGamesCount && preloadFetchPlayerGamesCount();
  }

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

  loadMoreRows = ({ startIndex, stopIndex }: Indexes) => {
    this.props.preloadFetchPlayerGames({
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
    key: string,
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
      <VirtualList
        totalNumberOfRows={rowCount}
        rowHeight={ROW_HEIGHT}
        loadMoreRows={this.loadMoreRows}
        isRowLoaded={this.isRowLoaded}
        rowRenderer={this.renderRow}
        pageSize={PAGE_SIZE}
      />
    );
  }
}

export default GamesVirtualList;
