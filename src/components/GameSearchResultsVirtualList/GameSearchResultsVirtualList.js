// @flow
import * as React from "react";
import { append, range, assoc } from "ramda";
import Flex from "@casumo/cmp-flex";
import GameRowSkeleton from "Components/GameRowSkeleton";
import VirtualList from "Components/VirtualList";
import { PAGE_SIZE } from "Models/gameSearch";

const ROW_HEIGHT = 80;

type Indexes = {
  startIndex: number,
  stopIndex: number,
};

type Props = {
  /** The array of games slugs to render within the AllGamesList */
  games: Array<string>,
  /** The search query for highlighting text in results */
  query: string,
  /** The function that triggers the action that fetches the next batch of games */
  initFetchGameSearchPage: ({
    startIndex: number,
    pageSize: number,
    query: string,
  }) => void,
  /** The total number of rows */
  rowCount: number,
  /** The element to render as a row  */
  renderItem: (game: string) => React.Node,
};

type State = {
  loadedRowsMap: {},
  pagesMap: {},
};

class GameSearchResultsVirtualList extends React.PureComponent<Props, State> {
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
      resolve();
    });

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

    const loaded = range(startIndex, stop).reduce(
      (acc, curr) => ({
        ...acc,
        [curr]: 1,
      }),
      {}
    );

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

    if (page && !this.isPageRequested(page)) {
      this.props.initFetchGameSearchPage({
        startIndex,
        pageSize: PAGE_SIZE,
        query: this.props.query,
      });
      this.setPageAsLoaded(page);
    }

    return new Promise<Object>(resolve => {
      const promise = {
        startIndex,
        stopIndex,
        resolve,
      };
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

export default GameSearchResultsVirtualList;
