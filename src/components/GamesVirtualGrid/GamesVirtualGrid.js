// @flow
import * as React from "react";
import { Grid, InfiniteLoader, WindowScroller } from "react-virtualized";
import * as A from "Types/apollo";
import { ROOT_SCROLL_ELEMENT_ID } from "Src/constants";
import { GameTile } from "Components/GameTile";

type Props = {
  games: Array<A.GameTile_Game>,
  gamesCount: number,
  pageSize: number,
  loadMore: () => Promise<any>,
};

export const columnWidth = 168;
export const rowHeight = 200;

export const GamesVirtualGrid = ({
  games,
  gamesCount,
  pageSize,
  loadMore,
}: Props) => {
  const [containerWidth, setContainerWidth] = React.useState(columnWidth * 6);
  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setContainerWidth(node.getBoundingClientRect().width);
    }
  }, []);
  const columnCount = Math.floor(containerWidth / columnWidth);
  const width = columnWidth * columnCount;
  const rowCount = Math.ceil(gamesCount / columnCount);
  const rowsPerPage = Math.floor(pageSize / columnCount);

  return (
    <div ref={measuredRef} className="u-width--full">
      <InfiniteLoader
        isRowLoaded={({ index }) => Boolean(games[index * columnCount])}
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
                  const game = games[columnIndex + rowIndex * columnCount];

                  if (!game) {
                    return null;
                  }

                  return (
                    <div key={key} style={style} className="u-padding--sm">
                      <GameTile game={game} />
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
    </div>
  );
};
