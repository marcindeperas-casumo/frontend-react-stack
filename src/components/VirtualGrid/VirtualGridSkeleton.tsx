// @flow
import * as React from "react";
import * as R from "ramda";
import Skeleton from "@casumo/cmp-skeleton";
import type { spacerSizes } from "@casumo/cudl-react-prop-types";
import { VirtualGridMeasurer } from "./VirtualGridMeasurer";

const numberOfRows = 4;

export const VirtualGridSkeleton = ({
  tileWidth,
  tileHeight,
  spacerSize,
}: {
  tileWidth: number,
  tileHeight: number,
  spacerSize: spacerSizes,
}) => (
  <VirtualGridMeasurer
    spacerSize={spacerSize}
    tileWidth={tileWidth}
    tileHeight={tileHeight}
  >
    {({ columnWidth, rowHeight, cardMargin, columnCount, width }) => {
      const cards = R.times(
        rowIndex =>
          R.times(columnIndex => ({ rowIndex, columnIndex }), columnCount),
        numberOfRows
      );

      return (
        <Skeleton
          width={width}
          height={numberOfRows * rowHeight}
          preserveAspectRatio="xMinYMin"
          colorHi="#d3d8e1"
          colorLow="#e5eaed"
        >
          {cards.map(row =>
            row.map(({ rowIndex, columnIndex }) => (
              <rect
                key={columnCount * rowIndex + columnIndex}
                x={cardMargin + columnIndex * columnWidth}
                y={cardMargin + rowIndex * rowHeight}
                rx={16}
                ry={16}
                width={tileWidth}
                height={tileHeight}
              />
            ))
          )}
        </Skeleton>
      );
    }}
  </VirtualGridMeasurer>
);
