// @flow
import * as React from "react";
import DangerousHtml from "Components/DangerousHtml";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";
import { TableOfContents } from "./TableOfContents";
import { parseTableOfContents } from "./termsAndConditions.utils";
import "./termsAndConditions.scss";

type Props = {
  content: ?string,
  fetchVersionContent: number => void,
  version: number,
};

export function TermsAndConditionsContent(props: Props) {
  React.useEffect(() => {
    if (!props.content) {
      props.fetchVersionContent(props.version);
    }
  }, [props]);

  if (!props.content) {
    return (
      <div className="u-padding--md">
        <ParagraphSkeleton size="sm" />
        <ParagraphSkeleton size="sm" />
      </div>
    );
  }

  const { tableOfContents, content } = parseTableOfContents(props.content);

  return (
    <>
      <TableOfContents tableOfContents={tableOfContents} />
      <DangerousHtml element="div" className="u-padding--md" html={content} />
    </>
  );
}
