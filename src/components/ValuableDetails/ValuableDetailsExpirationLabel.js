//@flow
import React from "react";
import Text from "@casumo/cmp-text";
import classNames from "classnames";
import "./ValuableDetails.scss";

type Props = {
  /* Free text expiration time to be displayed */
  text: string,
  /* Any additional classnames */
  className?: string,
};

export const defaultColor = "t-color-white";
export const defaultBackground = "t-background-red";

export const ValuableDetailsExpirationLabel = ({ text, className }: Props) => {
  return (
    <Text
      tag="div"
      size="sm"
      className={classNames(
        "u-display--inline-block u-text-transform-uppercase u-padding-x--md u-padding-y--sm c-valuable-details__expiration-label t-color-white",
        "u-font-weight-bold",
        className
      )}
    >
      {text}
    </Text>
  );
};
