//@flow
import React from "react";
import Text from "@casumo/cmp-text";
import classNames from "classnames";

type Props = {
  /* Free text expiration time to be displayed */
  text: string,
  /* Any additional classnames */
  className?: string,
};

export const ValuableDetailsExpirationLabel = ({ text, className }: Props) => {
  return (
    <Text
      tag="div"
      size="sm"
      data-test="expiration-label"
      className={classNames(
        "u-display--inline-block t-border-r--xs u-text-transform-uppercase u-padding-x--md u-padding-y--sm t-color-white",
        "u-font-weight-bold",
        className
      )}
    >
      {text}
    </Text>
  );
};
