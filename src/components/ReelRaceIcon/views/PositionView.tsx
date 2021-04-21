import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { LaurelIcon } from "@casumo/cmp-icons";
import React from "react";
import cx from "classnames";
import { getLaurelColor } from "Models/reelRaces/reelRaces.utils";

import "../ReelRaceIcon.scss";

export const PositionView = ({
  position,
  className,
}: {
  position: number;
  className?: string;
}) => (
  <Flex
    className={cx("text-white u-line-height--1", className)}
    direction="vertical"
    spacing="none"
    align="center"
  >
    <Flex.Item>
      <LaurelIcon size="sm" className={`t-color-${getLaurelColor(position)}`} />
    </Flex.Item>
    <Flex.Item>
      <Text
        className="text-white u-font-weight-bold"
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
