// @flow
import * as React from "react";
import * as R from "ramda";
import Skeleton from "@casumo/cmp-skeleton";

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
    R.intersperse(heights.margin),
    R.prepend(index === 0 ? 0 : heights.margin),
    R.sum
  )(skeletonItems);

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
    viewBox={null}
    width="100%"
    height={500 || window.innerHeight}
    className="u-padding-top--xlg u-display--none@tablet"
  >
    {skeletonItems.map((height, index) => (
      <SkeletonItem
        {...{ height, index, key: `betting-glossary-skeleton-${index}` }}
      />
    ))}
    /> ))}
  </Skeleton>
);
