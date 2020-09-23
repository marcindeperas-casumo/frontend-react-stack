// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { LaurelIcon } from "@casumo/cmp-icons";
import cx from "classnames";
import { type CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";

import "../ReelRaceIcon.scss";

const getLaurelColor = position =>
  cx({
    "t-color-yellow-30": position === 1,
    "t-color-grey-20": position === 2,
    "c-reel-race-icon-color-brown": position === 3,
    "t-color-grey-0": position > 3,
  });

export const PositionView = ({
  position,
  className,
}: CurrentReelRaceInfo & { className?: string }) => (
  <Flex
    className={cx("t-color-white u-line-height--1", className)}
    direction="vertical"
    spacing="none"
    align="center"
  >
    <Flex.Item>
      <LaurelIcon size="sm" className={getLaurelColor(position)} />
    </Flex.Item>
    <Flex.Item>
      <Text
        className="t-color-white u-font-weight-bold"
        tag="div"
        size={position < 100 ? "sm" : "xs"}
      >
        {position}
      </Text>
    </Flex.Item>
  </Flex>
);

// eslint-disable-next-line fp/no-mutation
PositionView.displayName = "PositionView";
