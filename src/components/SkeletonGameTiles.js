/* @flow */
import * as React from "react";
import Skeleton from "@casumo/cmp-skeleton";

type Props = {
  numberOfTiles: number,
  tileWidth: number,
  tileHeight: number,
  tileGap?: number,
};

const SkeletonGameTiles = ({
  numberOfTiles = 8,
  tileWidth,
  tileHeight,
  tileGap = 2,
  ...props
}: Props) => {
  const skeletonWidth = tileWidth * numberOfTiles;
  const skeletonHeight = tileHeight + 58;
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
            rx="3"
            ry="3"
            width={tileWidth}
            height={tileHeight}
          />
        );
      })}
    </Skeleton>
  );
};

export default SkeletonGameTiles;
