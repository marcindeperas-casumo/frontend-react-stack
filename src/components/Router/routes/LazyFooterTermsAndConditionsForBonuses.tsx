import * as React from "react";
import LazyPortal from "Components/LazyPortal";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";

export function LazyFooterTermsAndConditionsForBonuses() {
  return (
    <LazyPortal
      hostElementId="react-host-footer-terms-and-conditions-for-bonuses"
      loader={() => import("Components/TermsAndConditionsForBonuses")}
      fallback={<ParagraphSkeleton size="sm" className="u-margin-y--2xlg" />}
      namedExport="TermsAndConditionsForBonuses"
    />
  );
}
