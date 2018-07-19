/* @flow */
import Skeleton from "@casumo/cmp-skeleton";
import React from "react";

type Props = {
  numberOfCards: number,
  cardWidth: number,
  cardHeight: number,
  cardGap?: number,
  cornerRadius?: number,
};

const LiveCasinoSkeleton = ({
  numberOfCards = 4,
  cardWidth,
  cardHeight,
  cardGap = 16,
  cornerRadius = 8,
  ...props
}: Props) => {
  const skeletonWidth = cardWidth * numberOfCards;
  const skeletonHeight = cardHeight + 58;

  return (
    <Skeleton width={skeletonWidth} height={skeletonHeight} {...props}>
      <rect
        x="0"
        y="0"
        rx={cornerRadius}
        ry={cornerRadius}
        width="80"
        height="16"
      />
      {Array.from(Array(numberOfCards).keys()).map(pos => {
        const x = pos === 0 ? pos * cardWidth : pos * (cardWidth + cardGap);

        return (
          <React.Fragment key={pos}>
            <rect
              x={x}
              y={cardHeight - (cardHeight - 30)}
              rx={cornerRadius}
              ry={cornerRadius}
              width={cardWidth}
              height={cardHeight - 120}
            />
            <rect
              x={x}
              y={cardHeight - 80}
              rx={cornerRadius}
              ry={cornerRadius}
              width={cardWidth / 3}
              height="14"
            />
            <rect
              x={x}
              y={cardHeight - 60}
              rx={cornerRadius}
              ry={cornerRadius}
              width={(45 / 100) * cardWidth}
              height="14"
            />
            <rect
              x={x + cardWidth - (40 / 100) * cardWidth}
              y={cardHeight - 80}
              rx="20"
              ry="20"
              width={(40 / 100) * cardWidth}
              height="35"
            />
            <rect
              x={x}
              y={cardHeight - 20}
              rx="0"
              ry="0"
              width={cardWidth}
              height="1"
            />
            <rect
              x={x}
              y={cardHeight - 12}
              rx="6"
              ry="6"
              width={(15 / 100) * cardWidth}
              height="12"
            />
            <rect
              x={x + cardWidth - (20 / 100) * cardWidth}
              y={cardHeight - 12}
              rx="6"
              ry="6"
              width={(20 / 100) * cardWidth}
              height="12"
            />
          </React.Fragment>
        );
      })}
    </Skeleton>
  );
};

export default LiveCasinoSkeleton;
