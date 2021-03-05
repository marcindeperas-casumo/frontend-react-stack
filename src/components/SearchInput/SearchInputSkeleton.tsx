import Skeleton from "@casumo/cmp-skeleton";
import React, { PureComponent } from "react";

export default class SearchInputSkeleton extends PureComponent {
  render() {
    return (
      <Skeleton viewBox={null} width="100%" height={72}>
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
      </Skeleton>
    );
  }
}
