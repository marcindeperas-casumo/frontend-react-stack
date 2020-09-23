// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import cx from "classnames";
import { type CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";

import "../ReelRaceIcon.scss";

export const PointsView = ({
  points,
  pointsText,
  className,
}: CurrentReelRaceInfo & { className?: string }) => {
  return (
    <Flex
      className={cx("u-line-height--1", className)}
      direction="vertical"
      spacing="none"
      align="center"
    >
      <Flex.Item>
        <Text className="t-color-grey-50 " tag="div" size="xs">
          {pointsText}
        </Text>
      </Flex.Item>
      <Flex.Item>
        <Text
          className="t-color-white u-font-weight-bold"
          tag="div"
          size={points < 100 ? "sm" : "xs"}
        >
          {points}
        </Text>
      </Flex.Item>
    </Flex>
  );
};

// eslint-disable-next-line fp/no-mutation
PointsView.displayName = "PointsView";
