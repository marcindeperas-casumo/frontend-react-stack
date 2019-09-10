// @flow
import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

export class SettingsRowSkeleton extends PureComponent<{}> {
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
        <rect x="20" y="32" rx="3" ry="3" width="120" height="12" />
        <rect x="20" y="50" rx="3" ry="3" width="200" height="16" />

        <rect
          x="100%"
          y="32"
          rx="3"
          ry="3"
          width="32"
          height="32"
          transform="translate(-64, 0)"
        />
      </Skeleton>
    );
  }
}
