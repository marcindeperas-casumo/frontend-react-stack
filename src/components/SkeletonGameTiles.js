/* @flow */
import Skeleton from "@casumo/cmp-skeleton";
import React from "react";

type Props = {
  numberOfTiles: number,
  tileWidth: number,
  tileRatio?: number,
  tileGap?: number,
  tileRadius?: number,
};

const SkeletonGameTiles = ({
  numberOfTiles = 8,
  tileWidth,
  tileRatio = 120 / 100,
  tileGap = 2,
  tileRadius = 3,
  ...props
}: Props) => {
  const skeletonWidth = tileWidth * numberOfTiles;
  const tileHeight = tileWidth * tileRatio;
  const skeletonHeight = tileHeight + 40;
  return (
    <Skeleton width={skeletonWidth} height={skeletonHeight} {...props}>
      <rect x="0" y="0" rx="3" ry="3" width="80" height="18" />
      {Array.from(Array(numberOfTiles).keys()).map(pos => {
        const x = pos === 0 ? pos * tileWidth : pos * (tileWidth + tileGap);
        return (
          <rect
            key={pos}
            x={x}
            y="40"
            rx={tileRadius}
            ry={tileRadius}
            width={tileWidth}
            height={tileHeight}
          />
        );
      })}
    </Skeleton>
  );
};

export default SkeletonGameTiles;
