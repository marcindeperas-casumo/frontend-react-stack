// @flow
import * as React from "react";
import * as R from "ramda";
import Skeleton from "@casumo/cmp-skeleton";
import { rowHeight, columnWidth } from "./GamesVirtualGrid";

const cardWidth = 160;
const cardHeight = 192;
const numberOfRows = 4;

export const GamesVirtualGridSkeleton = () => {
  const [containerWidth, setContainerWidth] = React.useState(columnWidth * 4);
  const measuredRef = React.useCallback(node => {
    if (node !== null) {
      setContainerWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const numberOfCardsInRow = Math.floor(containerWidth / columnWidth);
  const cards = R.times(
    rowIndex =>
      R.times(columnIndex => ({ rowIndex, columnIndex }), numberOfCardsInRow),
    numberOfRows
  );

  return (
    <div ref={measuredRef} className="u-width--full">
      <Skeleton
        width={numberOfCardsInRow * columnWidth}
        height={numberOfRows * rowHeight}
        preserveAspectRatio="xMinYMin"
        colorHi="#d3d8e1"
        colorLow="#e5eaed"
      >
        {cards.map(row =>
          row.map(({ rowIndex, columnIndex }) => (
            <rect
              key={numberOfCardsInRow * rowIndex + columnIndex}
              x={4 + columnIndex * columnWidth}
              y={4 + rowIndex * rowHeight}
              rx={16}
              ry={16}
              width={cardWidth}
              height={cardHeight}
            />
          ))
        )}
      </Skeleton>
    </div>
  );
};
