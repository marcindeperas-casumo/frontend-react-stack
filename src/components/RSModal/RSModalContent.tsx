// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import { ParagraphSkeleton } from "Components/Skeleton/Paragraph";

export function ModalContentLoading() {
  return (
    <Flex direction="vertical">
      <ParagraphSkeleton size="sm" />
      <ParagraphSkeleton size="sm" />
    </Flex>
  );
}
