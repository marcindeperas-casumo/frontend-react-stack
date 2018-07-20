/* @flow */
import Skeleton from "@casumo/cmp-skeleton";
import React from "react";

type Props = {
  numberOfCards: number,
  itemWidth: number,
  itemHeight: number,
  itemGap?: number,
  cornerRadius?: number,
  cornerRadius?: string,
};

const GameListSkeleton = ({
  items = 8,
  itemWidth,
  itemRatio = 120 / 100,
  itemGap = 2,
  cornerRadius = 3,
  display = "tiles",
  ...props
}: Props) => {
  const skeletonWidth = itemWidth * items;
  const itemHeight = itemWidth * itemRatio;
  const displayCards = display === "cards";
  const skeletonHeight = displayCards ? itemHeight : itemHeight + 40;

  return (
    <Skeleton width={skeletonWidth} height={skeletonHeight} {...props}>
      <rect x="0" y="0" rx="3" ry="3" width="80" height="18" />
      {Array.from(Array(items).keys()).map(pos => {
        const x = pos === 0 ? pos * itemWidth : pos * (itemWidth + itemGap);
        if (displayCards) {
          return (
            <React.Fragment key={pos}>
              <rect
                x={x}
                y={itemHeight - (itemHeight - 30)}
                rx={cornerRadius}
                ry={cornerRadius}
                width={itemWidth}
                height={itemHeight - 120}
              />
              <rect
                x={x}
                y={itemHeight - 80}
                rx={cornerRadius}
                ry={cornerRadius}
                width={itemWidth / 3}
                height="14"
              />
              <rect
                x={x}
                y={itemHeight - 60}
                rx={cornerRadius}
                ry={cornerRadius}
                width={(45 / 100) * itemWidth}
                height="14"
              />
              <rect
                x={x + itemWidth - (40 / 100) * itemWidth}
                y={itemHeight - 80}
                rx="20"
                ry="20"
                width={(40 / 100) * itemWidth}
                height="35"
              />
              <rect
                x={x}
                y={itemHeight - 20}
                rx="0"
                ry="0"
                width={itemWidth}
                height="1"
              />
              <rect
                x={x}
                y={itemHeight - 12}
                rx="6"
                ry="6"
                width={(15 / 100) * itemWidth}
                height="12"
              />
              <rect
                x={x + itemWidth - (20 / 100) * itemWidth}
                y={itemHeight - 12}
                rx="6"
                ry="6"
                width={(20 / 100) * itemWidth}
                height="12"
              />
            </React.Fragment>
          );
        } else {
          return (
            <rect
              key={pos}
              x={x}
              y="40"
              rx={cornerRadius}
              ry={cornerRadius}
              width={itemWidth}
              height={itemHeight}
            />
          );
        }
      })}
    </Skeleton>
  );
};

export default GameListSkeleton;
