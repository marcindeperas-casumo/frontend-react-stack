import Skeleton from "@casumo/cmp-skeleton";
import * as React from "react";
import * as R from "ramda";

const heights = {
  margin: 32,
  sm: 24,
  md: 48,
  lg: 96,
};

const skeletonItems = R.flatten(
  R.repeat([heights.sm, heights.md, heights.lg], 5)
);

const SkeletonItem = ({ height, index }) => {
  const offsetTop = R.pipe(
    R.take(index),
    // @ts-expect-error ts-migrate(2769) FIXME: No overload matches this call.
    R.intersperse(heights.margin),
    R.prepend(index === 0 ? 0 : heights.margin),
    R.sum
  )(skeletonItems) as number;

  return (
    <rect
      rx={1.5}
      ry={1.5}
      x={0}
      y={offsetTop}
      height={height}
      width={height === heights.sm ? "75%" : "100%"}
    />
  );
};

export const BettingGlossarySkeleton = () => (
  <Skeleton
    colorHi="#d3d8e1"
    colorLow="#e5eaed"
    viewBox={null}
    width="100%"
    height={500 || window.innerHeight}
    className="u-padding-top--xlg u-display--none@tablet"
  >
    {skeletonItems.map((height, index) => (
      <SkeletonItem
        key={`betting-glossary-skeleton-${index}`}
        height={height}
        index={index}
      />
    ))}
  </Skeleton>
);
