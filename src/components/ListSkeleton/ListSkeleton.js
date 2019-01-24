// @flow
import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

type Props = {
  className?: string,
  items?: number,
  titleXOffset?: string,
  titleYOffset?: string,
};

export default class ListSkeleton extends PureComponent<Props> {
  render() {
    const {
      className = "",
      items = 8,
      titleXOffset = "0",
      titleYOffset = "0",
    } = this.props;

    return (
      <div className={className}>
        <Skeleton width="320" height="60" className="u-display--block">
          <rect
            x={titleXOffset}
            y={titleYOffset}
            rx="3"
            ry="3"
            width="150"
            height="20"
          />
        </Skeleton>
        {Array.from(Array(items).keys()).map(item => (
          <Skeleton
            width="320"
            height="80"
            key={`must-drop-skeleton-${item}`}
            className="u-display--block"
          >
            <rect x={titleXOffset} y="0" rx="0" ry="0" width="70" height="70" />
            <rect x="100" y="15" rx="3" ry="3" width="200" height="15" />
            <rect x="100" y="40" rx="3" ry="3" width="150" height="15" />
          </Skeleton>
        ))}
      </div>
    );
  }
}
