import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

export default class CuratedCardSkeleton extends PureComponent {
  render() {
    return (
      <div className="c-curated-card o-ratio o-ratio--curated-card">
        <Skeleton className="o-ratio__content" width="100" height="100">
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
        </Skeleton>
      </div>
    );
  }
}
