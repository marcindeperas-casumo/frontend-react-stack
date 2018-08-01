/* @flow */
import Skeleton from "@casumo/cmp-skeleton";
import React from "react";

import Matcher from "./Matcher";

type Props = {
  numberOfCards: number,
  itemWidth: number,
  itemHeight: number,
  itemGap?: number,
  cornerRadius?: number,
  cornerRadius?: string,
  title?: boolean,
};

const GameListSkeleton = ({
  items = 8,
  itemWidth,
  itemRatio = 120 / 100,
  itemGap = 4,
  cornerRadius = 8,
  display = "tiles",
  title = true,
  ...props
}: Props) => {
  const skeletonWidth = itemWidth * items;
  const itemHeight = itemWidth * itemRatio;
  const displayCards = display === "cards";
  const skeletonHeight = displayCards ? itemHeight : itemHeight + 40;

  const renderCards = () =>
    Array.from(Array(items).keys()).map(pos => {
      const x = pos === 0 ? pos * itemWidth : pos * (itemWidth + itemGap);
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
    });

  const renderTiles = () =>
    Array.from(Array(items).keys()).map(pos => {
      const x = pos === 0 ? pos * itemWidth : pos * (itemWidth + itemGap);
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
    });

  const CardOrTile = props => (
    <Matcher
      getKey={({ display }) => display}
      matchers={{
        cards: renderCards,
        tiles: renderTiles,
      }}
      {...props}
    />
  );

  return (
    <Skeleton width={skeletonWidth} height={skeletonHeight} {...props}>
      {title && <rect x="0" y="0" rx="3" ry="3" width="80" height="18" />}
      <CardOrTile display={display} />
    </Skeleton>
  );
};

export default GameListSkeleton;
