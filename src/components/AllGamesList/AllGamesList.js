/* eslint-disable fp/no-mutation */
import React, { PureComponent } from "react";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";
import Flex from "@casumo/cmp-flex";
import GameRowSearch from "Components/GameRowSearch";
import GameRowSkeleton from "Components/GameRowSkeleton";

class AllGamesList extends PureComponent {
  constructor() {
    super();
    this.ROW_HEIGHT = 80; // check game row height
    this.PAGE_SIZE = 50; // check how many elements are coming from the API
    this.REMOTE_ROWS_COUNT = 1290; // wire up something that tells us this number

    this.state = {
      list: [],
      pagesLoaded: [],
    };
  }

  componentWillReceiveProps;

  isRowLoaded = ({ index }) => {
    return Boolean(this.state.list[index]);
  };

  loadMoreRows = ({ startIndex, stopIndex }) => {
    const { games } = this.props;

    if (
      !this.isRowLoaded(startIndex) &&
      !this.state.pagesLoaded.includes(startIndex)
    ) {
      this.setState({
        pagesLoaded: [...this.state.pagesLoaded, startIndex],
      });
      return new Promise(resolve => {
        // fetch next page
        resolve(games);
      }).then(games => {
        this.setState({
          list: [...this.state.list, ...games],
        });
        return this.state.list;
      });
    }
    return Promise.resolve(this.state.list);
  };

  renderRow = ({ key, index, style }) => {
    if (this.isRowLoaded({ index })) {
      return (
        <div key={key} index={index} style={style} className="t-border-bottom">
          <GameRowSearch slug={this.state.list[index]} />
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
    return (
      <div style={{ height: "100vh" }}>
        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={this.REMOTE_ROWS_COUNT}
          minimumBatchSize={this.PAGE_SIZE}
          threshold={this.PAGE_SIZE / 2}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ width, height }) => (
                <List
                  className="c-virtual-list"
                  ref={registerChild}
                  onRowsRendered={onRowsRendered}
                  rowCount={this.REMOTE_ROWS_COUNT}
                  width={width}
                  height={height}
                  rowHeight={this.ROW_HEIGHT}
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

export default AllGamesList;
