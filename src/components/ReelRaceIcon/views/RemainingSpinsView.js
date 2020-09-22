// @flow
import React from "react";
import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { SpinIcon } from "@casumo/cmp-icons";
import cx from "classnames";
import { type CurrentReelRaceInfo } from "Utils/hooks/useCurrentReelRaceInfo";

import "../ReelRaceIcon.scss";

export const RemainingSpinsView = ({
  remainingSpins,
  className,
}: CurrentReelRaceInfo & { className?: string }) => (
  <Flex
    className={cx("t-color-white", className)}
    direction="vertical"
    spacing="none"
    align="center"
  >
    <Flex.Item>
      <SpinIcon size="sm" />
    </Flex.Item>
    <Flex.Item>
      <Text className="t-color-white u-font-weight-bold" tag="div" size="sm">
        {remainingSpins}
      </Text>
    </Flex.Item>
  </Flex>
);

// eslint-disable-next-line fp/no-mutation
RemainingSpinsView.displayName = "RemainingSpinsView";
