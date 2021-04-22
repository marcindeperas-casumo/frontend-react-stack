import Text from "@casumo/cmp-text";
import * as React from "react";
import cx from "classnames";

type Props = {
  points: number;
  isTransitioning: boolean;
};

const baseClassName = "c-rr-booster__points";

export function Points({ points, isTransitioning = false }: Props) {
  return (
    <Text
      tag="div"
      className={cx(
        baseClassName,
        isTransitioning
          ? `text-white ${baseClassName}--transitioning`
          : "text-grey-50",
        "u-text-align-center u-font-weight-bold"
      )}
    >
      +{points}
    </Text>
  );
}
