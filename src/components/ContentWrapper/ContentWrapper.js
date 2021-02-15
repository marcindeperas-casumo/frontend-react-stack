// @flow
import * as React from "react";
import cx from "classnames";

type Props = {
  children: React.Node,
  className?: string,
};

export const ContentWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cx(
        "u-content-width u-padding-x u-padding-x--5xlg@desktop",
        className
      )}
    >
      {children}
    </div>
  );
};
