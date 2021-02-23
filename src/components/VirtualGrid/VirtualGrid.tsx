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
  // @ts-expect-error ts-migrate(2694) FIXME: Namespace 'React' has no exported member 'Abstract... Remove this comment to see the full error message
  TileComponent: React.AbstractComponent<T>,
  tileWidth: number,
  tileHeight: number,
  spacerSize: spacerSizes,
  numberOfEntries: number,
  // @ts-expect-error ts-migrate(2300) FIXME: Duplicate identifier 'number'.
  loadMore?: ({ startIndex: number, stopIndex: number }) => Promise<any>,
  // @ts-expect-error ts-migrate(2724) FIXME: 'React' has no exported member named 'Element'. Di... Remove this comment to see the full error message
  tileLoadingElement?: React.Element<any>,
};

// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'T'.
export const VirtualGrid = <T>({
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'dataList'.
  dataList,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'TileComponent'.
  TileComponent,
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'spacerSize'. Did you mean 'space... Remove this comment to see the full error message
  spacerSize,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tileWidth'.
  tileWidth,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tileHeight'.
  tileHeight,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'numberOfEntries'.
  numberOfEntries,
  // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'loadMore'.
  loadMore = Promise.resolve,
  // @ts-expect-error ts-migrate(2552) FIXME: Cannot find name 'tileLoadingElement'. Did you mea... Remove this comment to see the full error message
  tileLoadingElement = null,
// @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'T'.
}: Props<T>) => (
  <VirtualGridMeasurer
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spacerSize'.
    spacerSize={spacerSize}
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tileWidth'.
    tileWidth={tileWidth}
    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tileHeight'.
    tileHeight={tileHeight}
  >
    {({ columnWidth, rowHeight, cardMargin, columnCount, width }) => {
      // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'numberOfEntries'.
      const rowCount = Math.ceil(numberOfEntries / columnCount);

      return (
        <InfiniteLoader
          isRowLoaded={({ index }) =>
            R.all(
              R.equals(true),
              R.times(x => {
                const i = index * columnCount + x;
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'numberOfEntries'.
                if (i >= numberOfEntries) {
                  // if out of bound, treat it as loaded
                  // (in last row couple of columns can be empty)
                  return true;
                }
                // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'dataList'.
                return Boolean(dataList[i]);
              }, columnCount)
            )
          }
          loadMoreRows={debounce(
            ({ startIndex, stopIndex }) =>
              // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'loadMore'.
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
                    // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'dataList'.
                    const data = dataList[i];

                    return (
                      <div
                        key={key}
                        style={style}
                        className={classNames(
                          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'spacerSize'.
                          createModifierClasses("u-padding", spacerSize)
                        )}
                      >
                        {(() => {
                          if (data) {
                            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'TileComponent'.
                            return <TileComponent {...data} />;
                          // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'numberOfEntries'.
                          } else if (i < numberOfEntries) {
                            // @ts-expect-error ts-migrate(2304) FIXME: Cannot find name 'tileLoadingElement'.
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
