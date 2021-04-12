import Flex from "@casumo/cmp-flex";
import * as React from "react";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";

export function ModalContentLoading() {
  return (
    <Flex direction="vertical">
      <ParagraphSkeleton size="sm" />
      <ParagraphSkeleton size="sm" />
    </Flex>
  );
}
