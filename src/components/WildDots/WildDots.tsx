import * as React from "react";
import * as R from "ramda";
import classNames from "classnames";

type Props = {
  /** number of dots that should be rendered */
  numberOfDots: number;
  /** zero-based index of active dot */
  activeDotIndex: number;
  /** optional classes for active dot */
  activeDotClassNames?: string;
  /** optional classes for inactive dot */
  inactiveDotClassNames?: string;
};

export const WildDots = ({
  activeDotClassNames = "bg-purple-80",
  inactiveDotClassNames = "bg-grey-5",
  ...props
}: Props) => {
  const dots = R.times(
    i => (
      <div
        key={i}
        className={classNames("u-padding--sm t-border-r--circle u-margin--sm", {
          [activeDotClassNames]: i === props.activeDotIndex,
          [inactiveDotClassNames]: i !== props.activeDotIndex,
        })}
      />
    ),
    props.numberOfDots
  );

  return <>{dots}</>;
};
