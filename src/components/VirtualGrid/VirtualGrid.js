// @flow
import * as React from "react";
import * as R from "ramda";
import classNames from "classnames";
import { Grid, InfiniteLoader, WindowScroller } from "react-virtualized";
import debounce from "lodash.debounce";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";
import { createModifierClasses } from "@casumo/cudl-react-utils";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import { VirtualGridMeasurer } from "./VirtualGridMeasurer";
import "./virtualGrid.scss";

type Props<T> = {
  dataList: Array<T>,
  TileComponent: React.AbstractComponent<T>,
  tileWidth: number,
  tileHeight: number,
  spacerSize: spacerSizes,
  numberOfEntries: number,
  loadMore?: ({ startIndex: number, stopIndex: number }) => Promise<any>,
  tileLoadingElement?: React.Element<any>,
};

export const VirtualGrid = <T>({
  dataList,
  TileComponent,
  spacerSize,
  tileWidth,
  tileHeight,
  numberOfEntries,
  loadMore = Promise.resolve,
  tileLoadingElement = null,
}: Props<T>) => (
  <VirtualGridMeasurer
    spacerSize={spacerSize}
    tileWidth={tileWidth}
    tileHeight={tileHeight}
  >
    {({ columnWidth, rowHeight, cardMargin, columnCount, width }) => {
      const rowCount = Math.ceil(numberOfEntries / columnCount);

      return (
        <InfiniteLoader
          isRowLoaded={({ index }) =>
            R.all(
              R.equals(true),
              R.times(x => {
                const i = index * columnCount + x;
                if (i >= numberOfEntries) {
                  // if out of bound, treat it as loaded
                  // (in last row couple of columns can be empty)
                  return true;
                }
                return Boolean(dataList[i]);
              }, columnCount)
            )
          }
          loadMoreRows={debounce(
            ({ startIndex, stopIndex }) =>
              loadMore({
                startIndex: startIndex * columnCount,
                stopIndex: stopIndex * columnCount + columnCount,
              }),
            300
          )}
          rowCount={rowCount}
          threshold={2}
          minimumBatchSize={4}
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
                    const i = columnIndex + rowIndex * columnCount;
                    const data = dataList[i];

                    return (
                      <div
                        key={key}
                        style={style}
                        className={classNames(
                          createModifierClasses("u-padding", spacerSize)
                        )}
                      >
                        {(() => {
                          if (data) {
                            return <TileComponent {...data} />;
                          } else if (i < numberOfEntries) {
                            return tileLoadingElement;
                          }

                          return null;
                        })()}
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
                  overscanColumnCount={0} // by design we're not allowing horizontal scroll, so all columns will be visible anyway
                  overscanRowCount={4}
                />
              )}
            </WindowScroller>
          )}
        </InfiniteLoader>
      );
    }}
  </VirtualGridMeasurer>
);
