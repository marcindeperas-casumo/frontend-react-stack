/* @flow */
import React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import Matcher from "Components/Matcher";

const defaultClassNames = `
  u-padding-top--lg
  u-padding-top--xlg@tablet
  u-padding-top--xlg@desktop
  u-padding-left--md
  u-padding-left--2xlg@tablet
  u-padding-left--2xlg@desktop
`;

type Props = {
  itemWidth?: number,
  items?: number,
  itemWidth: number,
  itemRatio?: number,
  itemGap?: number,
  cornerRadius?: number,
  display?: string,
  title?: boolean,
  className?: string,
};

export default function GameListSkeleton({
  itemWidth = 170,
  items = 8,
  itemRatio = 120 / 100,
  itemGap = 8,
  cornerRadius = 8,
  display = "tiles",
  title = true,
  className = defaultClassNames,
  ...props
}: Props) {
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
        default: renderTiles,
      }}
      {...props}
    />
  );

  return (
    <Skeleton
      width={skeletonWidth}
      height={skeletonHeight}
      preserveAspectRatio="xMinYMin"
      colorLow="#eff6f6"
      colorHi="#ffffff"
      className={className}
      {...props}
    >
      {title && <rect x="0" y="0" rx="3" ry="3" width="80" height="18" />}
      <CardOrTile display={display} />
    </Skeleton>
  );
}
