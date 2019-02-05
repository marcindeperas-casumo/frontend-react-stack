/* eslint-disable fp/no-mutation */
// @flow
import React, { PureComponent } from "react";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";
import Flex from "@casumo/cmp-flex";
import GameRowSearch from "Components/GameRowSearch";
import GameRowSkeleton from "Components/GameRowSkeleton";

const ROW_HEIGHT = 80;
const PAGE_SIZE = 50;

type Props = {
  /** The array of games slugs to render within the AllGamesList */
  games: Array<string>,
  /** The function that triggers the action that fetches the next batch of games */
  fetchPage: void,
  /** The total number of rows */
  remoteRowsCount: number,
  /** The element to render as a row  */
  renderItem: Function,
};

class GamesVirtualList extends PureComponent<Props> {
  isRowLoaded = ({ index }: { index: number }) => {
    const { games } = this.props;

    return Boolean(games[index]);
  };

  loadMoreRows = async ({
    startIndex,
    stopIndex,
  }: {
    startIndex: number,
    stopIndex: number,
  }) => {
    const { games } = this.props;

    // fetch page action startIndex / page size
    return await games;
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
    const { games, renderItem } = this.props;

    console.log(renderItem);

    if (this.isRowLoaded({ index })) {
      return (
        <div key={key} index={index} style={style} className="t-border-bottom">
          {renderItem(games[index])}
          {/* <GameRowSearch slug={games[index]} /> */}
        </div>
      );
    }

    return (
      <Flex
        align="center"
        key={key}
        index={index}
        style={style}
        className="t-border-bottom"
      >
        <GameRowSkeleton />
      </Flex>
    );
  };

  render() {
    const { remoteRowsCount } = this.props;
    return (
      <div style={{ height: "100vh" }}>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={remoteRowsCount}
          minimumBatchSize={PAGE_SIZE}
          threshold={PAGE_SIZE / 2}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width, height }) => (
                <List
                  className="c-virtual-list"
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
      </div>
    );
  }
}

export default GamesVirtualList;
