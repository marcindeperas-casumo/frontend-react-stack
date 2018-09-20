/* @flow */
import Skeleton from "@casumo/cmp-skeleton";
import React from "react";

import Matcher from "./Matcher";

type Props = {
  items?: number,
  itemWidth: number,
  itemRatio?: number,
  itemGap?: number,
  cornerRadius?: number,
  itemHeight: number,
  display: string,
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
  const itemHeight: number = itemWidth * itemRatio;
  const displayCards = display === "cards";
  const skeletonHeight: number = displayCards
    ? itemHeight
    : title
      ? itemHeight + 40
      : itemHeight;

  const renderCards = () =>
    Array.from(Array(items).keys()).map(pos => {
      const x = pos === 0 ? pos * itemWidth : pos * (itemWidth + itemGap);
      return (
        <React.Fragment key={pos}>
          <rect
            x={x}
            y={title ? itemHeight - (itemHeight - 30) : 0}
            rx={cornerRadius}
            ry={cornerRadius}
            width={itemWidth}
            height={itemHeight - 135}
          />
          <rect
            x={x}
            y={itemHeight - 120}
            rx={cornerRadius}
            ry={cornerRadius}
            width={(45 / 100) * itemWidth}
            height="18"
          />
          <rect
            x={x}
            y={itemHeight - 95}
            rx={cornerRadius}
            ry={cornerRadius}
            width={itemWidth / 4}
            height="14"
          />
          <rect
            x={x + itemWidth - (40 / 100) * itemWidth}
            y={itemHeight - 120}
            rx="25"
            ry="25"
            width={(40 / 100) * itemWidth}
            height="50"
          />
          <rect
            x={x}
            y={itemHeight - 30}
            rx="0"
            ry="0"
            width={itemWidth}
            height="1"
          />
          <rect
            x={x}
            y={itemHeight - 20}
            rx="8"
            ry="8"
            width="28"
            height="16"
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
          y={title ? 40 : 0}
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
