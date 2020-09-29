// @flow
import * as React from "react";
import cx from "classnames";
import Flex from "@casumo/cmp-flex";
import Text from "@casumo/cmp-text";
import { TrophyIcon } from "@casumo/cmp-icons";

import "./Price.scss";

type Props = {
  price?: ?string,
  className?: string,
  highlighted?: boolean,
};

const baseClassName = "c-price";

export const Price = ({ price, highlighted, className }: Props) => (
  <div className={cx("u-display--inline-block", className)}>
    <Flex
      className={cx(`${baseClassName} t-border-r--md u-overflow-hidden`, {
        "t-background-brown-30": highlighted,
        "t-background-grey-0 ": !highlighted,
      })}
      align="center"
    >
      <Flex.Item>
        <TrophyIcon
          className={cx(`c${baseClassName}__icon`, {
            "t-color-grey-50": !highlighted,
            "t-color-white": highlighted,
          })}
        />
      </Flex.Item>
      <Flex.Block className="u-text-align-left">
        <Text
          tag="div"
          className={cx("u-font-weight-bold", {
            "t-color-grey-90": !highlighted,
            "t-color-white": highlighted,
          })}
        >
          {price}
        </Text>
      </Flex.Block>
    </Flex>
  </div>
);
