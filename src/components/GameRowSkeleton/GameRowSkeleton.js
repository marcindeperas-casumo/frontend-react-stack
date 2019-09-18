// @flow
import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

type Props = {};

export class GameRowSkeleton extends PureComponent<Props> {
  render() {
    return (
      <Skeleton
        colorHi="#d3d8e1"
        colorLow="#e5eaed"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox={null}
      >
        <rect x="0" y="8" rx="16" ry="16" width="64" height="64" />
        <rect x="80" y="32" rx="3" ry="3" width="150" height="16" />
        <rect
          x="100%"
          y="32"
          rx="3"
          ry="3"
          width="16"
          height="16"
          transform="translate(-16, 0)"
        />
      </Skeleton>
    );
  }
}
