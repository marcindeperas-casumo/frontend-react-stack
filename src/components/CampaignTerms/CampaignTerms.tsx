import React from "react";
import DangerousHtml from "Components/DangerousHtml";

type TProps = {
  content: string;
};

export const CampaignTerms = ({ content }: TProps) => {
  return (
    <DangerousHtml element="div" className="u-padding--md" html={content} />
  );
};
