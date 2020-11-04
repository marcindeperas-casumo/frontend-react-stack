// @flow
import * as React from "react";
import cx from "classnames";
import Text from "@casumo/cmp-text";

type Props = {
  points: number,
  isTransitioning: boolean,
};

const baseClassName = "c-rr-booster__points";

export function Points({ points, isTransitioning = false }: Props) {
  return (
    <Text
      tag="div"
      className={cx(
        baseClassName,
        isTransitioning
          ? `t-color-white ${baseClassName}--transitioning`
          : "t-color-grey-50",
        "u-text-align-center u-font-weight-bold"
      )}
    >
      +{points}
    </Text>
  );
}
