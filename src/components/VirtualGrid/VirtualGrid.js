// @flow
import * as React from "react";
import classNames from "classnames";
import { Grid, InfiniteLoader, WindowScroller } from "react-virtualized";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import { VirtualGridMeasurer } from "./VirtualGridMeasurer";

type Props<T> = {
  dataList: Array<T>,
  TileComponent: React.AbstractComponent<T>,
  tileWidth: number,
  tileHeight: number,
  spacerSize: spacerSizes,
  showSkeleton?: boolean,
  numberOfEntries?: number,
  pageSize?: number,
  loadMore?: () => Promise<any>,
};

export const VirtualGrid = <T>({
  dataList,
  TileComponent,
  spacerSize,
  tileWidth,
  tileHeight,
  showSkeleton = false,
  loadMore = Promise.resolve,
  ...props
}: Props<T>) => {
  const numberOfEntries = props.numberOfEntries || dataList.length;
  const pageSize = props.pageSize || numberOfEntries;

  return (
    <VirtualGridMeasurer
      spacerSize={spacerSize}
      tileWidth={tileWidth}
      tileHeight={tileHeight}
    >
      {({ columnWidth, rowHeight, cardMargin, columnCount, width }) => {
        const rowCount = Math.ceil(numberOfEntries / columnCount);
        const rowsPerPage = Math.floor(pageSize / columnCount);

        return (
          <InfiniteLoader
            isRowLoaded={({ index }) => Boolean(dataList[index * columnCount])}
            loadMoreRows={loadMore}
            minimumBatchSize={rowsPerPage}
            rowCount={rowCount}
            threshold={rowsPerPage * 2}
          >
            {({ onRowsRendered, registerChild }) => (
              <WindowScroller
                scrollElement={
                  document.getElementById(ROOT_SCROLL_ELEMENT_ID) || window
                }
              >
                {({ scrollTop, isScrolling, onChildScroll, height }) => (
                  <Grid
                    ref={registerChild}
                    cellRenderer={({ columnIndex, rowIndex, style, key }) => {
                      const data =
                        dataList[columnIndex + rowIndex * columnCount];

                      if (!data) {
                        return null;
                      }

                      return (
                        <div
                          key={key}
                          style={style}
                          className={classNames(
                            createModifierClasses("u-padding", spacerSize)
                          )}
                        >
                          <TileComponent {...data} />
                        </div>
                      );
                    }}
                    onSectionRendered={({ rowStartIndex, rowStopIndex }) =>
                      onRowsRendered({
                        startIndex: rowStartIndex,
                        stopIndex: rowStopIndex,
                      })
                    }
                    columnCount={columnCount}
                    rowCount={rowCount}
                    columnWidth={columnWidth}
                    rowHeight={rowHeight}
                    width={width}
                    autoHeight
                    height={height || 0}
                    isScrolling={isScrolling}
                    onScroll={onChildScroll}
                    scrollTop={scrollTop}
                    isScrollingOptOut
                    overscanColumnCount={0} // by design we're not allowing horizontal scroll, so all columns will be visible anyway
                  />
                )}
              </WindowScroller>
            )}
          </InfiniteLoader>
        );
      }}
    </VirtualGridMeasurer>
  );
};
