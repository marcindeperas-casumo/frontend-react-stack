// @flow
import * as React from "react";
import { useTranslations } from "Utils/hooks";
import { interpolate } from "Utils";
import DangerousHtml from "Components/DangerousHtml";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";
import { cmsSlugs } from "Models/tac";
import { TableOfContents } from "./TableOfContents";
import { parseTableOfContents } from "./termsAndConditions.utils";
import "./termsAndConditions.scss";

type Props = {
  version: number,
};

export function TermsAndConditionsContent({ version }: Props) {
  const rawContent = useTranslations(
    interpolate(cmsSlugs.content, { version }),
    true
  );

  if (!rawContent) {
    return (
      <div className="u-padding--md">
        <ParagraphSkeleton size="sm" />
        <ParagraphSkeleton size="sm" />
      </div>
    );
  }

  const { tableOfContents, content } = parseTableOfContents(rawContent);

  return (
    <>
      <TableOfContents tableOfContents={tableOfContents} />
      <DangerousHtml element="div" className="u-padding--md" html={content} />
    </>
  );
}
