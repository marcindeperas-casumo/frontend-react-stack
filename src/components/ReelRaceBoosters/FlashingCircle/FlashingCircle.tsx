// @flow
import * as React from "react";
import cx from "classnames";
import "./FlashingCircle.scss";

type Props = {
  isTransitioning?: boolean,
};

const classNamePrefix = "c-rr-booster__flashing-circle";

export function FlashingCircle({ isTransitioning = false }: Props) {
  return (
    <circle
      cx={28}
      cy={28}
      r={29}
      fill="currentColor"
      className={cx(
        "t-color-teal-50",
        `${classNamePrefix}`,
        isTransitioning && `${classNamePrefix}--transitioning`
      )}
    />
  );
}
