// @flow
import React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import "./CheckeredFlagIcon.scss";
type Props = {
  className: ?string,
  inactive: ?Boolean,
};

export const CheckeredFlagIcon = ({ className, inactive }: Props) => (
  <Flex.Item
    className={cx(
      "c-checkered-flag u-margin-left--none",
      { "c-checkered-flag-inactive": inactive },
      className
    )}
  ></Flex.Item>
);
