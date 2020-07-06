// @flow
import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

type Props = {
  /** use bigger version, ie. on search page */
  big?: boolean,
};

export class GameRowSkeleton extends PureComponent<Props> {
  static defaultProps = {
    big: false,
  };

  render() {
    const tileSize = this.props.big ? 80 : 56;
    const baseY = this.props.big ? 24 : 8;
    const baseX = this.props.big ? 24 : 16;
    const rightIconSize = 16;
    const rightIconOffset = baseX + rightIconSize / 2;

    return (
      <Skeleton
        colorHi="#d3d8e1"
        colorLow="#e5eaed"
        width="100%"
        height="100%"
        preserveAspectRatio="none"
        viewBox={null}
      >
        <rect
          x={baseX}
          y={baseY}
          rx="16"
          ry="16"
          width={tileSize}
          height={tileSize}
        />
        <rect
          x={baseX + tileSize + 16}
          y={baseY + tileSize / 2 - 8}
          rx="3"
          ry="3"
          width="150"
          height="16"
        />
        <rect
          x="100%"
          y={Math.floor(baseY + tileSize / 2 - rightIconSize / 2)}
          rx="3"
          ry="3"
          width={rightIconSize}
          height={rightIconSize}
          transform={`translate(-${rightIconOffset + rightIconSize}, 0)`}
        />
      </Skeleton>
    );
  }
}
