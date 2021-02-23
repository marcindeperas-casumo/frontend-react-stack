// @flow
import React, { PureComponent } from "react";
// @ts-expect-error ts-migrate(2305) FIXME: Module '"../../../node_modules/@types/react"' has ... Remove this comment to see the full error message
import type { Node } from "react";
import {
  List,
  WindowScroller,
  InfiniteLoader,
  AutoSizer,
} from "react-virtualized";
import debounce from "lodash.debounce";
import "./VirtualList.scss";

type OwnProps = {
    /** Element id to attach scroll event listeners. Defaults to window */
    scrollElement: HTMLElement | null;
    /** The total number of items in the list. */
    totalNumberOfRows: number;
    /** The height of a row. Can be a number or a function that returns the height of a row by index. */
    rowHeight: Function | number;
    /** Callback to load rows as user scrolls. */
    // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'number'.
    loadMoreRows: ({ startIndex: number, stopIndex: number }) => Promise<any>;
    /** Function to check if a row is loaded */
    isRowLoaded: ({ index: number }) => boolean;
    /** Render Prop to render a row. */
    // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'boolean'.
    rowRenderer: ({ index: number, isScrolling: boolean, isVisible: boolean, key: string, parent: Object, style: Object, }) => Node;
    /** number of items per page */
    pageSize: number;
    /**
     * if this prop will change list will know to update its rows
     * it's needed for lists that can change order
     */
    listHash?: string;
};

type Props = OwnProps & typeof VirtualList.defaultProps;

class VirtualList extends PureComponent<Props> {
  static defaultProps = {
    listHash: "",
  };

  render() {
    const {
      rowHeight,
      totalNumberOfRows,
      loadMoreRows,
      isRowLoaded,
      rowRenderer,
      pageSize,
      scrollElement,
      listHash,
    } = this.props;

    return (
      <InfiniteLoader
        isRowLoaded={isRowLoaded}
        loadMoreRows={debounce(
          ({ startIndex, stopIndex }) =>
            loadMoreRows({ startIndex, stopIndex }),
          300
        )}
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
                    listHash={listHash}
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
