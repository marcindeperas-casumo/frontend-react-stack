import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

export default class MustDropJackpotsSkeleton extends PureComponent {
  render() {
    const items = 8;

    return (
      <div className="u-padding--md">
        {Array.from(Array(items).keys()).map(item => (
          <Skeleton width="375" height="80" key={`must-drop-skeleton-${item}`}>
            <rect x="0" y="0" rx="0" ry="0" width="70" height="70" />
            <rect x="100" y="15" rx="3" ry="3" width="150" height="15" />
            <rect x="100" y="40" rx="3" ry="3" width="200" height="15" />
          </Skeleton>
        ))}
      </div>
    );
  }
}
