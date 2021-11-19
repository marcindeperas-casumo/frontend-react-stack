import React from "react";
import { useTranslationsGql } from "Utils/hooks";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";
import { navigate } from "Services/NavigationService";
import { CampaignTerms } from "./CampaignTerms";

export const CampaignTermsContainer = props => {
  const { slug } = props;
  const { t, loading } = useTranslationsGql({
    content: `root:toc.${slug}:content`,
  });

  if (loading) {
    return (
      <div className="u-padding--md">
        <ParagraphSkeleton size="sm" />
        <ParagraphSkeleton size="sm" />
        <ParagraphSkeleton size="sm" />
      </div>
    );
  }

  if (!loading && !t.content) {
    navigate({ url: "404" });
  }

  return <CampaignTerms content={t.content} />;
};
