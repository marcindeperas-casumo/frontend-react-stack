import React from "react";
import LazyPortal from "Components/LazyPortal";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";

export const LazyCampaignTerms = props => (
  <LazyPortal
    hostElementId="react-host-campaign-terms"
    loader={() => import("Components/CampaignTerms")}
    fallback={<ParagraphSkeleton size="md" />}
    namedExport="CampaignTerms"
    props={props}
  />
);
