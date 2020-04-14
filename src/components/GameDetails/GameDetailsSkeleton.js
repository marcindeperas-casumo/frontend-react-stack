// @flow
import React from "react";
import Skeleton from "@casumo/cmp-skeleton";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";

export const GameDetailsSkeleton = () => (
  <>
    <div style={{ height: 164 }}>
      <Skeleton height="100%" width="100%" viewBox={null}>
        <rect x="0" y="0" rx="0" ry="0" width="100%" height="100%" />
      </Skeleton>
    </div>
    <div className="u-padding-x u-padding-top">
      <ParagraphSkeleton size="default" />
    </div>
    <div className="u-padding">
      <ParagraphSkeleton size="default" />
    </div>
  </>
);
