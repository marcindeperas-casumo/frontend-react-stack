//@flow
import React, { type Node } from "react";
import Text from "@casumo/cmp-text";
import { DateTime } from "luxon";
import classNames from "classnames";

type Props = {
  time: DateTime,
  children: string => Node,
  className?: string,
};
export const ValuableDetailsExpirationLabel = ({
  time,
  children,
  className,
}: Props) => {
  const readableExpiration = DateTime.utc()
    .plus({ hours: 3 })
    .toRelative();

  return (
    <div
      className={classNames(
        "u-display--inline-block u-text-transform-uppercase t-color-red-light-1 u-padding-x--md u-padding-y--sm c-valuable-details__pill",
        className
      )}
    >
      <Text
        tag="span"
        size="sm"
        className="t-color-red-light-1 u-font-weight-bold"
      >
        {children(readableExpiration)}
      </Text>
    </div>
  );
};
