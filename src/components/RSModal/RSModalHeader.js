// @flow
import * as React from "react";
import classNames from "classnames";
import Flex from "@casumo/cmp-flex";
import Skeleton from "@casumo/cmp-skeleton";
import { CrossIcon } from "@casumo/cmp-icons";
import Text from "@casumo/cmp-text";

type Props = {
  title: ?string,
  hideModal: () => void,
};

export function ModalHeader(props: Props) {
  return (
    <Flex
      className="u-padding-left--lg u-padding-y--lg t-background-white"
      direction="horizontal"
      align="center"
      spacing="md"
      justify="space-between"
      data-test-name="rsmodal-header"
    >
      <Text
        size="sm"
        tag="span"
        data-test-name="rsmodal-header-text"
        className="u-font-weight-bold t-color-black o-flex__block u-text-align-center"
      >
        {props.title || <ModalTitleSkeleton />}
      </Text>
      <CrossIcon
        className="u-padding-right--lg t-color-black u-cursor-pointer"
        onClick={props.hideModal}
        data-test-name="rsmodal-header-close"
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
