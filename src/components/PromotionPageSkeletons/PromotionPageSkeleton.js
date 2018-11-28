import React, { PureComponent } from "react";
import Skeleton from "@casumo/cmp-skeleton";

export default class PromotionPageSkeleton extends PureComponent {
  render() {
    return (
      <Skeleton width="100%" height="600px">
        <rect x="0" y="0" rx="8" ry="8" width="100%" height="192" />
        <rect x="24" y="226" rx="3" ry="3" width="233" height="24" />
        <rect x="24" y="258" rx="3" ry="3" width="147" height="16" />
        <rect x="24" y="316" width="327" height="16" />
        <rect x="24" y="340" width="310" height="16" />
        <rect x="24" y="364" width="327" height="16" />
        <rect x="24" y="388" width="310" height="16" />
        <rect x="24" y="412" width="327" height="16" />
        <rect x="24" y="436" width="310" height="16" />
      </Skeleton>
    );
  }
}
