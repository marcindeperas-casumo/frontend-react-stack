// @flow
import React, { PureComponent } from "react";
import type { Node } from "react";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";

import "./VirtualList.scss";

type Props = {
  /** The total number of items in the list. */
  totalNumberOfRows: number,
  /** The height of a row. Can be a number or a function that returns the height of a row by index. */
  rowHeight: Function | number,
  /** Callback to load rows as user scrolls. */
  loadMoreRows: Function => Promise<any>,
  /** Function to check if a row is loaded */
  isRowLoaded: Function => boolean,
  /** Render Prop to render a row. */
  rowRenderer: Function => Node,
  /** number of items per page */
  pageSize: number,
};

class VirtualList extends PureComponent<Props> {
  render() {
    const {
      rowHeight,
      totalNumberOfRows,
      loadMoreRows,
      isRowLoaded,
      rowRenderer,
      pageSize,
    } = this.props;

    return (
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={loadMoreRows}
        rowCount={totalNumberOfRows}
        minimumBatchSize={pageSize}
        threshold={pageSize / 2}
      >
        {({ onRowsRendered, registerChild }) => (
          <AutoSizer>
            {({ width, height }) => (
              <List
                className="c-virtual-list"
                ref={registerChild}
                onRowsRendered={onRowsRendered}
                rowCount={totalNumberOfRows}
                width={width}
                height={height}
                rowHeight={rowHeight}
                rowRenderer={rowRenderer}
              />
            )}
          </AutoSizer>
        )}
      </InfiniteLoader>
    );
  }
}

export default VirtualList;
