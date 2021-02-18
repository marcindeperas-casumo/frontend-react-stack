// @flow
import * as React from "react";
import cx from "classnames";

type TProps = {
  children: React.Node,
  className?: string,
};

export const Panel = ({ className, children }: TProps) => {
  return (
    <div
      className={cx(
        "t-background-white t-elevation--10 u-padding-x--md u-padding-y--lg t-border-r--md",
        className
      )}
    >
      {children}
    </div>
  );
};
