// @flow
import * as React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import { GameRow } from "Components/GameRow";

export const GameRowSkeleton = () => {
  const tileSize = GameRow.ICON_SIZE;
  const padding = (GameRow.ROW_HEIGHT - GameRow.ICON_SIZE) / 2;
  const rightIconSize = 24;
  const rightIconOffset = padding + rightIconSize / 2;

  return (
    <Skeleton
      colorHi="#d3d8e1"
      colorLow="#e5eaed"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      viewBox={null}
    >
      <rect
        x={padding}
        y={padding}
        rx="16"
        ry="16"
        width={tileSize}
        height={tileSize}
      />
      <rect
        x={padding + tileSize + 16}
        y={padding + tileSize / 2 - 8}
        rx="3"
        ry="3"
        width="150"
        height="16"
      />
      <rect
        x="100%"
        y={Math.floor(padding + tileSize / 2 - rightIconSize / 2)}
        rx="3"
        ry="3"
        width={rightIconSize}
        height={rightIconSize}
        transform={`translate(-${rightIconOffset + rightIconSize}, 0)`}
      />
    </Skeleton>
  );
};
