// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";
import DangerousHtml from "Components/DangerousHtml";

export function ModalContent(props: { content: ?string }) {
  if (!props.content) {
    return (
      <Flex direction="vertical" className="c-rsmodal__content">
        <ParagraphSkeleton size="sm" />
        <ParagraphSkeleton size="sm" />
      </Flex>
    );
  }

  return (
    <DangerousHtml
      className="c-rsmodal__content"
      element="div"
      html={props.content}
    />
  );
}
