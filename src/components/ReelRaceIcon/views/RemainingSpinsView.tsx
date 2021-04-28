import Text from "@casumo/cmp-text";
import Flex from "@casumo/cmp-flex";
import { SpinIcon } from "@casumo/cmp-icons";
import React from "react";
import cx from "classnames";
import "../ReelRaceIcon.scss";

export const RemainingSpinsView = ({
  remainingSpins,
  className,
}: {
  className?: string;
  remainingSpins: number;
}) => (
  <Flex
    className={cx("text-white ", className)}
    direction="vertical"
    spacing="none"
    align="center"
  >
    <Flex.Item>
      <SpinIcon size="sm" />
    </Flex.Item>
    <Flex.Item>
      <Text
        className="text-white u-font-weight-bold"
        tag="div"
        size={remainingSpins < 100 ? "sm" : "xs"}
      >
        {remainingSpins}
      </Text>
    </Flex.Item>
  </Flex>
);

// eslint-disable-next-line fp/no-mutation
RemainingSpinsView.displayName = "RemainingSpinsView";
