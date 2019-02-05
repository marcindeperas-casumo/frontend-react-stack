// @flow
import React, { PureComponent } from "react";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";
import Flex from "@casumo/cmp-flex";
import GameRowSearch from "Components/GameRowSearch";
import GameRowSkeleton from "Components/GameRowSkeleton";

type Props = {
  games: Array<string>,
};

const ROW_HEIGHT = 80;
const PAGE_SIZE = 50;
const REMOTE_ROWS_COUNT = 1290;
const THRESHOLD = 20;

class GamesVirtualList extends PureComponent<Props> {
  isRowLoaded = ({ index }: { index: number }) => {
    return Boolean(this.props.games[index]);
  };

  loadMoreRows = ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number,
    stopIndex: number,
  }) => {
    return Promise.resolve(this.props.games);
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
    return (
      <Flex direction="vertical" key={key} index={index} style={style}>
        {!this.isRowLoaded({ index }) ? (
          <GameRowSkeleton />
        ) : (
          <GameRowSearch slug={this.props.games[index]} />
        )}
      </Flex>
    );
  };

  render() {
    return (
      <InfiniteLoader
        isRowLoaded={this.isRowLoaded}
        loadMoreRows={this.loadMoreRows}
        rowCount={REMOTE_ROWS_COUNT}
        minimumBatchSize={PAGE_SIZE}
        threshold={THRESHOLD}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowCount={REMOTE_ROWS_COUNT}
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
