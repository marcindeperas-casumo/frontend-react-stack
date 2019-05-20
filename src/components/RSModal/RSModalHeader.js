// @flow
import * as React from "react";
import Flex from "@casumo/cmp-flex";
import Skeleton from "@casumo/cmp-skeleton";
import { CrossIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";

export function ModalHeader(props: { title: ?string, hideModal: () => void }) {
  return (
    <Flex
      className="u-padding-left--lg u-padding-vert--lg t-background-blue-light-1"
      direction="horizontal"
      align="center"
      spacing="md"
      justify="space-between"
    >
      <Text size="sm" tag="span" className="u-font-weight-bold t-color-white">
        {props.title || <ModalTitleSkeleton />}
      </Text>
      <CrossIcon
        className="u-padding-right--lg t-color-blue u-cursor-pointer"
        onClick={props.hideModal}
      />
    </Flex>
  );
}

export function ModalTitleSkeleton() {
  return (
    <Skeleton
      viewBox={null}
      width="100%"
      height="10px"
      colorHi="rgba(255,255,255,0.3)"
      colorLow="rgba(255,255,255,0.1)"
    >
      <rect x="0" y="0" rx="2" ry="2" width="100%" height="100%" />
    </Skeleton>
  );
}
