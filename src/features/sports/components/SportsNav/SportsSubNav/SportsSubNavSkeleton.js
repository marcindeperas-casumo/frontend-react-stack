import React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import Flex from "@casumo/cmp-flex";

const PillSkeleton = ({ width, subs, hideBadge }) => (
  <Flex.Item>
    <svg
      width={width}
      height="32"
      viewBox={`0 0 ${width} 32`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule={hideBadge ? "nonzero" : "evenodd"}
        clipRule="evenodd"
        d={`M16 0C7.16344 0 0 7.16344 0 16C0 24.8366 7.16344 32 16 ${
          subs[0]
        } 32 ${width} 24.8366 ${width} ${subs[1]} 7.16344 ${subs[2]} 0 ${
          subs[3]
        } 0H16ZM16 8C11.5817 8 8 11.5817 8 16C8 20.4183 11.5817 24 16 24C20.4183 24 24 20.4183 24 16C24 11.5817 20.4183 8 16 8Z`}
        fill="white"
      />
    </svg>
  </Flex.Item>
);

const PillSkeletons = {
  all: (
    <PillSkeleton
      width={43}
      subs={["32H27C35.8366", "16C43", "35.8366", "27"]}
      hideBadge
    />
  ),
  sm: (
    <PillSkeleton
      width={90}
      subs={["32H74C82.8366", "16C90", "82.8366", "74"]}
    />
  ),
  md: (
    <PillSkeleton
      width={148}
      subs={["32H132C140.837", "16C148", "140.837", "132"]}
    />
  ),
  lg: (
    <PillSkeleton
      width={171}
      subs={["32H155C163.837", "16C171", "163.837", "155"]}
    />
  ),
};

export const SportsSubNavSkeleton = () => (
  <div
    className="u-margin-top--sm"
    style={{
      height: 64,
      position: "relative",
      overflow: "hidden",
    }}
  >
    <Skeleton viewBox={null} width="100%" height="100%">
      <rect x={0} y={0} width="100%" height="100%" />
    </Skeleton>

    <Flex
      style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0 }}
      align="center"
      className="u-padding-x--lg u-padding-horix--3xlg@tablet"
      spacing="default"
    >
      {PillSkeletons.all}
      {PillSkeletons.md}
      {PillSkeletons.sm}
      {PillSkeletons.lg}
      {PillSkeletons.md}
      {PillSkeletons.sm}
      {PillSkeletons.lg}
    </Flex>
  </div>
);
