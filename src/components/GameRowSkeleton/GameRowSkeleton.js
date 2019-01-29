import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

class GameRowSkeleton extends PureComponent {
  render() {
    return (
      <Skeleton
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox={null}
      >
        <rect x="0" y="8" rx="16" ry="16" width="64" height="64" />
        <rect x="80" y="32" rx="3" ry="3" width="150" height="16" />
        <rect x="calc(100% - 40)" y="28" rx="3" ry="3" width="24" height="24" />
      </Skeleton>
    );
  }
}

export default GameRowSkeleton;
