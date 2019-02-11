// @flow
import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

type Props = {
  className?: string,
  title?: boolean,
  items?: number,
  titleXOffset?: string,
  titleYOffset?: string,
};

export default class ListSkeleton extends PureComponent<Props> {
  render() {
    const {
      className = "",
      title = true,
      items = 8,
      titleXOffset = "0",
      titleYOffset = "0",
    } = this.props;

    return (
      <div className={className}>
        {title && (
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
        )}
        {Array.from(Array(items).keys()).map(item => (
          <Skeleton
            width="100%"
            height={75}
            preserveAspectRatio="none"
            viewBox={null}
          >
            <rect x="0" y="8" rx="16" ry="16" width="64" height="64" />
            <rect x="80" y="32" rx="3" ry="3" width="150" height="16" />
            <rect
              x="calc(100% - 40)"
              y="28"
              rx="3"
              ry="3"
              width="24"
              height="24"
            />
          </Skeleton>
        ))}
      </div>
    );
  }
}
