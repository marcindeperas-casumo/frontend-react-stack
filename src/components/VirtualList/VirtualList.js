// @flow
import React, { PureComponent } from "react";
import type { Node } from "react";
import {
  List,
  WindowScroller,
  InfiniteLoader,
  AutoSizer,
} from "react-virtualized";
import "react-virtualized/styles.css";
import "./VirtualList.scss";

type Props = {
  /** Element id to attach scroll event listeners. Defaults to window */
  scrollElement: ?HTMLElement,
  /** The total number of items in the list. */
  totalNumberOfRows: number,
  /** The height of a row. Can be a number or a function that returns the height of a row by index. */
  rowHeight: Function | number,
  /** Callback to load rows as user scrolls. */
  loadMoreRows: Function => Promise<any>,
  /** Function to check if a row is loaded */
  isRowLoaded: Function => boolean,
  /** Render Prop to render a row. */
  rowRenderer: ({
    index: number,
    isScrolling: boolean,
    isVisible: boolean,
    key: string,
    parent: Object,
    style: Object,
  }) => Node,
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
      scrollElement,
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
          <WindowScroller scrollElement={scrollElement || window}>
            {({ height, scrollTop, isScrolling, onChildScroll }) => (
              <AutoSizer disableHeight>
                {({ width }) => (
                  <List
                    className="c-virtual-list"
                    ref={registerChild}
                    onRowsRendered={onRowsRendered}
                    rowCount={totalNumberOfRows}
                    width={width}
                    autoHeight
                    height={height || 0}
                    rowHeight={rowHeight}
                    rowRenderer={rowRenderer}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                  />
                )}
              </AutoSizer>
            )}
          </WindowScroller>
        )}
      </InfiniteLoader>
    );
  }
}

export default VirtualList;
