import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

export default class PromotionCardSkeleton extends PureComponent {
  render() {
    return (
      <div className="c-promotion-card o-ratio o-ratio--promotion-card o-flex__item o-flex__item-fixed-size">
        {/* use right ratio ☝🏻 I want this skeleton to have the same size of the real one, but how? :P
            In this case I created a ratio only for the skeleton, as Idon't use it on the component itself,
            but height looks already different. Could you save me @jack?
        */}
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
