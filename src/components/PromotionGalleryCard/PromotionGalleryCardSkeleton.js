import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

export default class PromotionGalleryCardSkeleton extends PureComponent {
  render() {
    return (
      <div className="c-promotion-gallery-card o-ratio o-ratio--promotion-card o-flex__item o-flex__item--no-shrink">
        <Skeleton
          viewBox={null}
          className="o-ratio__content"
          width="100%"
          height="100%"
        >
          <rect x="0" y="0" rx="8" ry="8" width="100%" height="100%" />
        </Skeleton>
      </div>
    );
  }
}
