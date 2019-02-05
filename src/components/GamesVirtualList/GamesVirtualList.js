// @flow
import React, { PureComponent } from "react";
import { debounce } from "lodash";
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
};

type State = {
  list: string[],
};

class GamesVirtualList extends PureComponent<Props, State> {
  state = {
    list: [""],
  };

  constructor(props: Props) {
    super(props);
    // eslint-disable-next-line fp/no-mutation
    this.fetchNext = debounce(this.fetchNext, 1000);
  }

  static getDerivedStateFromProps(props: Props, state: State) {
    const { games } = props;
    const { list } = state;

    if (games === list) {
      return null;
    }

    return { list: games };
  }

  fetchNext = ({
    startIndex,
    stopIndex,
    pageSize: PAGE_SIZE,
  }: {
    startIndex: number,
    stopIndex: number,
    pageSize: number,
  }) => {
    const { fetchNextPage } = this.props;

    return fetchNextPage({ startIndex, stopIndex, pageSize: PAGE_SIZE });
  };

  isRowLoaded = ({ index }: { index: number }) => {
    const { list } = this.state;

    return Boolean(list[index]);
  };

  loadMoreRows = async ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number,
    stopIndex: number,
  }) => {
    return this.fetchNext({ startIndex, stopIndex, pageSize: PAGE_SIZE });
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
    const { renderItem } = this.props;
    const { list } = this.state;

    if (this.isRowLoaded({ index })) {
      return (
        <div key={key} index={index} style={style}>
          {renderItem(list[index])}
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
