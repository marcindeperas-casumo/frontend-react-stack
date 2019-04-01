import React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import Flex from "@casumo/cmp-flex";

const SportsSubNavSkeleton = () => (
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
      className="u-padding-horiz--lg u-padding-horix--3xlg@tablet"
      spacing="default"
    >
      {[...Array(5)].map((_, i) => (
        <Flex.Item
          className="o-flex__item-fixed-size"
          key={i}
          style={{
            backgroundColor: "#FFF",
            width: i === 0 ? 55 : 150,
            height: 32,
            borderRadius: 16,
          }}
        />
      ))}
    </Flex>
  </div>
);

export default SportsSubNavSkeleton;
