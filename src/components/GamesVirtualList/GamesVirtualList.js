// @flow
import React, { PureComponent } from "react";
import { append, range, assoc } from "ramda";

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
  pagesMap: {},
};

class GamesVirtualList extends PureComponent<Props, State> {
  componentDidMount() {
    this.props.preloadFetchPlayerGamesCount &&
      this.props.preloadFetchPlayerGamesCount();
  }

  promises = {
    list: [],
  };

  state = {
    loadedRowsMap: {},
    pagesMap: {},
  };

  componentDidUpdate() {
    const loadedPromises = this.promises.list.filter(this.isPromiseLoaded);
    const notLoadedPromises = this.promises.list.filter(
      o => !this.isPromiseLoaded(o)
    );

    loadedPromises.forEach(({ startIndex, stopIndex, resolve }) => {
      this.setRowsAsLoaded({ startIndex, stopIndex });
      return resolve();
    });

    // eslint-disable-next-line
    this.promises.list = notLoadedPromises;
  }

  isPromiseLoaded = ({ startIndex, stopIndex }: Indexes) =>
    this.props.games[startIndex] && this.props.games[stopIndex];

  isRowLoaded = ({ index }: { index: number }) =>
    Boolean(this.state.loadedRowsMap[index]);

  isPageRequested = (page: number) => Boolean(this.state.pagesMap[page]);

  setRowsAsLoaded = ({ startIndex, stopIndex }: Indexes) => {
    // adjust for last row loading
    const stop = stopIndex + 1;

    // eslint-disable-next-line
    let loaded = {};
    range(startIndex, stop).forEach(i => {
      // eslint-disable-next-line
      loaded = {
        ...loaded,
        ...assoc(i, 1, loaded),
      };
    });

    this.setState(prevState => {
      return {
        loadedRowsMap: {
          ...prevState.loadedRowsMap,
          ...loaded,
        },
      };
    });
  };

  setPageAsLoaded = (page: number) => {
    this.setState(prevState => ({
      pagesMap: {
        ...prevState.pagesMap,
        ...assoc(page, 1, this.state.pagesMap),
      },
    }));
  };

  loadMoreRows = ({ startIndex, stopIndex }: Indexes) => {
    const page = Math.ceil(startIndex / PAGE_SIZE);

    if (!this.isPageRequested(page)) {
      this.props.preloadFetchPlayerGames({
        startIndex,
        stopIndex,
        pageSize: PAGE_SIZE,
      });
      this.setPageAsLoaded(page);
    }

    return new Promise<Object>(resolve => {
      const promise = {
        startIndex,
        stopIndex,
        resolve,
      };
      // eslint-disable-next-line
      this.promises.list = append(promise, this.promises.list);
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
        {this.props.renderItem(this.props.games[index])}
      </div>
    );
  };

  render() {
    return (
      <VirtualList
        totalNumberOfRows={this.props.rowCount}
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
